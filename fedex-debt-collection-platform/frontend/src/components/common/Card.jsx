import React from 'react';
import { theme } from '../../styles/theme';

const Card = ({ children, title, footer, style = {}, className = '' }) => {
    return (
        <div style={{
            backgroundColor: theme.colors.card, // #1e293b
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            color: theme.colors.text.primary,
            ...style
        }} className={className}>
            {title && (
                <div style={{
                    marginBottom: theme.spacing.md,
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: theme.colors.text.primary
                }}>
                    {title}
                </div>
            )}
            <div>{children}</div>
            {footer && (
                <div style={{
                    marginTop: theme.spacing.md,
                    paddingTop: theme.spacing.md,
                    borderTop: `1px solid ${theme.colors.border}`
                }}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
