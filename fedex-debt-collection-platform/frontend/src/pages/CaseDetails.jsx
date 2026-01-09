import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CaseStatusForm from '../components/cases/CaseStatusForm';
import Center from '../components/common/Center';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { theme } from '../styles/theme';

const CaseDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const caseData = location.state?.caseData || { id: id, customerId: 'Unknown', status: 'Open' }; // Fallback

    const handleSave = (updatedData) => {
        console.log('Saving case data:', updatedData);
        // Here you would call API to update
        alert('Case updated successfully!');
        navigate('/collector-dashboard');
    };

    return (
        <div style={{ padding: theme.spacing.xl, maxWidth: '800px', margin: '0 auto' }}>
            <Button variant="outline" onClick={() => navigate('/collector-dashboard')} style={{ marginBottom: theme.spacing.md }}>
                &larr; Back to My Cases
            </Button>

            <div style={{ display: 'grid', gap: theme.spacing.lg }}>
                {/* Case Info Summary */}
                <Card title={`Case Details: ${caseData.id}`}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.md }}>
                        <div>
                            <div style={{ color: theme.colors.text.secondary }}>Customer ID</div>
                            <div style={{ fontWeight: 600 }}>{caseData.customerId}</div>
                        </div>
                        <div>
                            <div style={{ color: theme.colors.text.secondary }}>Amount Due</div>
                            <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>${caseData.amountDue?.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style={{ color: theme.colors.text.secondary }}>Current Status</div>
                            <div style={{ fontWeight: 600 }}>{caseData.status}</div>
                        </div>
                    </div>
                </Card>

                {/* Action Form */}
                <CaseStatusForm
                    caseData={caseData}
                    onSave={handleSave}
                    onCancel={() => navigate('/collector-dashboard')}
                />
            </div>
        </div>
    );
};

export default CaseDetails;
