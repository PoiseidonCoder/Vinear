'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Slider } from '@/components/ui/slider';
import { Label } from './label';
import { Crop, RotateCcw, ZoomIn } from 'lucide-react';

interface ImageCropperProps {
    isOpen: boolean;
    onClose: () => void;
    onCrop: (croppedFile: File) => void;
    imageFile: File | null;
}

interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const ImageCropper = ({ isOpen, onClose, onCrop, imageFile }: ImageCropperProps) => {
    const t = useTranslations('settings.profile');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [, setImageUrl] = useState<string>('');
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !loadedImage) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 500;
        canvas.height = 500;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);

        // Calculate scale to fit image in canvas while maintaining aspect ratio
        const imageAspect = loadedImage.naturalWidth / loadedImage.naturalHeight;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth, drawHeight;
        if (imageAspect > canvasAspect) {
            // Image is wider, fit to canvas width
            drawWidth = canvas.width;
            drawHeight = canvas.width / imageAspect;
        } else {
            // Image is taller, fit to canvas height
            drawHeight = canvas.height;
            drawWidth = canvas.height * imageAspect;
        }

        ctx.drawImage(loadedImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        // Draw circular crop overlay - only darken outside the circle
        const centerX = crop.x + crop.width / 2;
        const centerY = crop.y + crop.height / 2;
        const radius = crop.width / 2;

        // Save context for overlay
        ctx.save();

        // Create inverse clipping path - everything EXCEPT the circle
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true); // true = counterclockwise for hole
        ctx.clip();

        // Fill only the area outside the circle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.restore();

        // Draw circular border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }, [crop, scale, rotation, loadedImage]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if click is inside the circular crop area
        const centerX = crop.x + crop.width / 2;
        const centerY = crop.y + crop.height / 2;
        const radius = crop.width / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance <= radius) {
            setIsDragging(true);
            setDragStart({ x: x - crop.x, y: y - crop.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - dragStart.x;
        const y = e.clientY - rect.top - dragStart.y;

        const maxX = canvas.width - crop.width;
        const maxY = canvas.height - crop.height;

        setCrop({
            ...crop,
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const getCroppedImage = async (): Promise<File> => {
        const canvas = canvasRef.current;
        if (!canvas || !loadedImage || !imageFile) throw new Error('Missing canvas or image');

        // Create a larger temporary canvas to handle rotation without clipping
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) throw new Error('Could not get canvas context');

        // Make temp canvas larger to accommodate rotation
        const tempSize = Math.max(crop.width, crop.height) * 2;
        tempCanvas.width = tempSize;
        tempCanvas.height = tempSize;

        // Calculate the same scaling used in drawCanvas
        const imageAspect = loadedImage.naturalWidth / loadedImage.naturalHeight;
        const canvasAspect = canvas.width / canvas.height;

        let displayWidth, displayHeight;
        if (imageAspect > canvasAspect) {
            displayWidth = canvas.width;
            displayHeight = canvas.width / imageAspect;
        } else {
            displayHeight = canvas.height;
            displayWidth = canvas.height * imageAspect;
        }

        // Calculate offset to center the image
        const offsetX = (canvas.width - displayWidth) / 2;
        const offsetY = (canvas.height - displayHeight) / 2;

        // Scale from display size to natural size
        const scaleX = loadedImage.naturalWidth / displayWidth;
        const scaleY = loadedImage.naturalHeight / displayHeight;

        // Adjust crop coordinates to account for centering offset
        const adjustedCropX = (crop.x - offsetX) * scaleX;
        const adjustedCropY = (crop.y - offsetY) * scaleY;
        const adjustedCropWidth = crop.width * scaleX;
        const adjustedCropHeight = crop.height * scaleY;

        // Apply transformations to temp canvas
        tempCtx.save();
        tempCtx.translate(tempSize / 2, tempSize / 2);
        tempCtx.rotate((rotation * Math.PI) / 180);
        tempCtx.scale(scale, scale);

        // Draw the full image in temp canvas
        tempCtx.drawImage(loadedImage, -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight);

        tempCtx.restore();

        // Now create final crop canvas
        const croppedCanvas = document.createElement('canvas');
        const ctx = croppedCanvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        croppedCanvas.width = crop.width;
        croppedCanvas.height = crop.height;

        // Create circular clipping path on final canvas
        const radius = crop.width / 2;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
        ctx.clip();

        // Calculate crop position on temp canvas
        const tempCenterX = tempSize / 2;
        const tempCenterY = tempSize / 2;
        const cropOffsetX = crop.x + crop.width / 2 - canvas.width / 2;
        const cropOffsetY = crop.y + crop.height / 2 - canvas.height / 2;

        // Copy cropped area from temp canvas to final canvas
        ctx.drawImage(
            tempCanvas,
            tempCenterX + cropOffsetX - crop.width / 2,
            tempCenterY + cropOffsetY - crop.height / 2,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve) => {
            croppedCanvas.toBlob(
                (blob) => {
                    if (blob) {
                        const file = new File([blob], imageFile.name, {
                            type: imageFile.type,
                            lastModified: Date.now()
                        });
                        resolve(file);
                    }
                },
                imageFile.type,
                0.9
            );
        });
    };

    const handleCrop = async () => {
        try {
            const croppedFile = await getCroppedImage();
            onCrop(croppedFile);
            onClose();
        } catch (error) {
            console.error('Crop failed:', error);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setImageUrl('');
            setScale(1);
            setRotation(0);
            setCrop({ x: 0, y: 0, width: 250, height: 250 });
            setIsDragging(false);
            setLoadedImage(null);
            return;
        }

        if (!imageFile) return;

        const url = URL.createObjectURL(imageFile);
        setImageUrl(url);

        const img = new Image();
        img.onload = () => {
            setLoadedImage(img);

            // Calculate display size for centering crop
            const imageAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = 500 / 500; // canvas is 500x500

            let displayWidth, displayHeight;
            if (imageAspect > canvasAspect) {
                displayWidth = 500;
                displayHeight = 500 / imageAspect;
            } else {
                displayHeight = 500;
                displayWidth = 500 * imageAspect;
            }

            // Center the image in canvas
            const offsetX = (500 - displayWidth) / 2;
            const offsetY = (500 - displayHeight) / 2;

            // Set crop size to fit nicely within the displayed image
            const cropSize = Math.min(displayWidth, displayHeight) * 0.7;

            setCrop({
                x: offsetX + (displayWidth - cropSize) / 2,
                y: offsetY + (displayHeight - cropSize) / 2,
                width: cropSize,
                height: cropSize
            });
        };
        img.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [isOpen, imageFile]);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle className='flex items-center space-x-2'>
                        <Crop className='w-5 h-5' />
                        <span>{t('crop_image')}</span>
                    </DialogTitle>
                    <DialogDescription>{t('crop_image_description')}</DialogDescription>
                </DialogHeader>

                <div className='space-y-4'>
                    <div className='flex justify-center'>
                        <canvas
                            ref={canvasRef}
                            className='border border-border rounded-lg cursor-move'
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='space-y-2'>
                            <Label className='flex items-center space-x-2'>
                                <ZoomIn className='w-4 h-4' />
                                <span>{t('zoom')}</span>
                            </Label>
                            <Slider value={[scale]} onValueChange={(value) => setScale(value[0])} min={0.5} max={3} step={0.1} className='w-full' />
                        </div>

                        <div className='space-y-2'>
                            <Label className='flex items-center space-x-2'>
                                <RotateCcw className='w-4 h-4' />
                                <span>{t('rotation')}</span>
                            </Label>
                            <Slider
                                value={[rotation]}
                                onValueChange={(value) => setRotation(value[0])}
                                min={-180}
                                max={180}
                                step={1}
                                className='w-full'
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label>{t('crop_size')}</Label>
                            <Slider
                                value={[crop.width]}
                                onValueChange={(value) => {
                                    const size = value[0];
                                    setCrop({
                                        x: Math.max(0, Math.min(crop.x, 500 - size)),
                                        y: Math.max(0, Math.min(crop.y, 500 - size)),
                                        width: size,
                                        height: size // Keep square for perfect circle
                                    });
                                }}
                                min={80}
                                max={450}
                                step={10}
                                className='w-full'
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant='outline' onClick={onClose}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleCrop}>{t('apply_crop')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
