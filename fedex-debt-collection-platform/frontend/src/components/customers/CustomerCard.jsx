import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { theme } from '../../styles/theme';

const CustomerCard = ({ customer, onAssign }) => {
    // Determine risk badge color
    const riskVariant = customer.riskScore > 80 ? 'high' : customer.riskScore > 50 ? 'medium' : 'low';

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: theme.colors.text.secondary }}>#{customer.id}</span>
                <Badge variant={riskVariant}>Risk: {customer.riskScore}</Badge>
            </div>

            <div style={{ margin: '10px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    ${customer.amountDue?.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.muted }}>
                    {customer.daysPastDue} Days Overdue
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Button
                    variant="primary"
                    onClick={() => onAssign(customer)}
                    style={{ width: '100%' }}
                >
                    Assign Case
                </Button>
            </div>
        </Card>
    );
};

export default CustomerCard;
