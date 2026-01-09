import React from 'react';
import Card from '../common/Card';
import { theme } from '../../styles/theme';

const StatCard = ({ label, value, subtext, color = theme.colors.primary }) => {
    return (
        <Card style={{ textAlign: 'center', padding: theme.spacing.xl }}>
            <div style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.sm, fontSize: '0.875rem' }}>
                {label}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: color, marginBottom: theme.spacing.xs }}>
                {value}
            </div>
            {subtext && (
                <div style={{ fontSize: '0.75rem', color: theme.colors.text.muted }}>
                    {subtext}
                </div>
            )}
        </Card>
    );
};

export default StatCard;
