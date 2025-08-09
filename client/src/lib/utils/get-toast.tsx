import { toast } from 'sonner';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { createElement } from 'react';

const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle
};

const colors = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800'
};

export const getToast = (type: keyof typeof icons, message: string, options?: { description?: string }) => {
    const IconComponent = icons[type];
    toast(message, {
        description: options?.description,
        icon: createElement(IconComponent, { size: 16, style: { color: colors[type] } }),
        style: {
            backgroundColor: 'oklch(var(--card))',
            borderLeft: `4px solid ${colors[type]}`,
            padding: '16px 20px',
            color: 'oklch(var(--card-foreground))',
            border: '1px solid oklch(var(--border))',
            borderRadius: '12px',
            boxShadow: '0 8px 32px oklch(0 0 0 / 0.12), 0 4px 16px oklch(0 0 0 / 0.08)',
            backdropFilter: 'blur(8px)',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.4',
            maxWidth: '420px'
        },
        className: 'toast-custom'
    });
};
