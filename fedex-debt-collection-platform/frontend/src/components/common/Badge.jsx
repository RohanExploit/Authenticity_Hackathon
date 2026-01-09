import React from 'react';
import { theme } from '../../styles/theme';

const Badge = ({ children, variant = 'primary' }) => {
    let bgColor = theme.colors.primary;
    let textColor = '#ffffff';

    switch (variant) {
        case 'success':
        case 'low': // For risk score
            bgColor = 'rgba(22, 163, 74, 0.2)'; // low opacity green
            textColor = theme.colors.success;
            break;
        case 'warning':
        case 'medium': // For risk score
            bgColor = 'rgba(245, 158, 11, 0.2)'; // low opacity amber
            textColor = theme.colors.warning;
            break;
        case 'danger':
        case 'high': // For risk score
            bgColor = 'rgba(220, 38, 38, 0.2)'; // low opacity red
            textColor = theme.colors.danger;
            break;
        default:
            bgColor = 'rgba(37, 99, 235, 0.2)'; // low opacity blue
            textColor = theme.colors.primary;
    }

    return (
        <span style={{
            backgroundColor: bgColor,
            color: textColor,
            padding: '2px 8px',
            borderRadius: theme.borderRadius.full,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>
            {children}
        </span>
    );
};

export default Badge;
