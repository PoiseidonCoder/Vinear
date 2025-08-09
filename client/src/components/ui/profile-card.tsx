import { Badge } from '@/components/ui/badge';
import { Check, X, Heart } from 'lucide-react';
import Image from 'next/image';

interface ProfileCardProps {
    name: string;
    age: number;
    image: string;
    verified?: boolean;
    className?: string;
}

const ProfileCard = ({ name, age, image, verified = false, className = '' }: ProfileCardProps) => {
    return (
        <div
            className={`z-20 bg-card rounded-2xl shadow-lg border border-border overflow-hidden w-64 h-80 scale-transition hover:shadow-xl ${className}`}
        >
            <div className='relative w-full h-full'>
                <Image src={image} alt={name} fill sizes='256px' quality={100} priority className='object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                <div className='absolute bottom-4 left-4 right-4'>
                    <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-white font-semibold text-lg'>
                            {name}, {age}
                        </h3>
                        {verified && (
                            <Badge variant='secondary' className='bg-primary text-primary-foreground border-0'>
                                <Check className='w-3 h-3 mr-1' />
                                Verified
                            </Badge>
                        )}
                    </div>
                    <div className='flex gap-2'>
                        <button className='bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium btn-transition shadow-sm hover:shadow-md flex items-center gap-2'>
                            <X className='w-4 h-4' />
                            Pass
                        </button>
                        <button className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium btn-transition shadow-sm hover:shadow-md flex items-center gap-2'>
                            <Heart className='w-4 h-4' />
                            Like
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
