import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { theme } from '../../styles/theme';

const CaseCard = ({ caseData, onUpdate }) => {
    // caseData should have id, customerId, riskScore, status, amountDue

    const statusVariant =
        caseData.status === 'Paid' ? 'success' :
            caseData.status === 'Open' ? 'warning' :
                'primary';

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: theme.colors.text.secondary }}>Case #{caseData.id}</span>
                <Badge variant={statusVariant}>{caseData.status}</Badge>
            </div>

            <div>
                <div style={{ color: theme.colors.text.secondary }}>Customer: {caseData.customerId}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, margin: '5px 0' }}>
                    ${caseData.amountDue?.toLocaleString()}
                </div>
            </div>

            <Button variant="outline" onClick={() => onUpdate(caseData)} style={{ marginTop: theme.spacing.sm }}>
                Update Status
            </Button>
        </Card>
    );
};

export default CaseCard;
