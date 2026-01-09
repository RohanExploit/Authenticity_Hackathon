import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { theme } from '../../styles/theme';

const CaseStatusForm = ({ caseData, onSave, onCancel }) => {
    const [status, setStatus] = useState(caseData.status || 'Contacted');
    const [amount, setAmount] = useState(caseData.amountPaid || '');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...caseData,
            status,
            amountPaid: status === 'Paid' ? amount : 0,
            remarks,
            lastUpdated: new Date().toISOString()
        });
    };

    return (
        <Card title={`Update Case #${caseData.id}`}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>

                <div>
                    <label style={{ display: 'block', marginBottom: theme.spacing.xs, color: theme.colors.text.secondary }}>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: theme.spacing.sm,
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text.primary,
                            border: `1px solid ${theme.colors.border}`,
                            borderRadius: theme.borderRadius.sm
                        }}
                    >
                        <option value="Contacted">Contacted</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                {status === 'Paid' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: theme.spacing.xs, color: theme.colors.text.secondary }}>Amount Paid</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            style={{
                                width: '100%',
                                padding: theme.spacing.sm,
                                backgroundColor: theme.colors.background,
                                color: theme.colors.text.primary,
                                border: `1px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.sm
                            }}
                        />
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: theme.spacing.xs, color: theme.colors.text.secondary }}>Remarks</label>
                    <textarea
                        rows="4"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Log communication details..."
                        style={{
                            width: '100%',
                            padding: theme.spacing.sm,
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text.primary,
                            border: `1px solid ${theme.colors.border}`,
                            borderRadius: theme.borderRadius.sm
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
                    <Button type="submit" variant="primary">Save Update</Button>
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                </div>

            </form>
        </Card>
    );
};

export default CaseStatusForm;
