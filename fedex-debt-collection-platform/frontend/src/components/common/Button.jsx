import React from 'react';
import { theme } from '../../styles/theme';

const Button = ({ children, onClick, variant = 'primary', size = 'md', style = {}, disabled = false, type = 'button' }) => {

    const getBackgroundColor = () => {
        if (disabled) return theme.colors.text.muted;
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'success': return theme.colors.success;
            case 'danger': return theme.colors.danger;
            case 'warning': return theme.colors.warning;
            case 'outline': return 'transparent';
            default: return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (variant === 'outline') return theme.colors.primary;
        return '#ffffff';
    };

    const pad = size === 'sm' ? '0.25rem 0.5rem' : size === 'lg' ? '0.75rem 1.5rem' : '0.5rem 1rem';
    const fs = size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
                padding: pad,
                fontSize: fs,
                borderRadius: theme.borderRadius.md,
                border: variant === 'outline' ? `1px solid ${theme.colors.primary}` : 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
                ...style
            }}
        >
            {children}
        </button>
    );
};

export default Button;
