import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { theme } from '../styles/theme';

const Settings = () => {
    return (
        <div style={{ padding: theme.spacing.xl, maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: theme.spacing.lg }}>Settings</h2>

            <Card title="User Preferences">
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Dark Mode</div>
                            <div style={{ color: theme.colors.text.secondary, fontSize: '0.875rem' }}>Use dark theme across the application</div>
                        </div>
                        <Button size="sm" variant="outline">Enabled</Button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Notifications</div>
                            <div style={{ color: theme.colors.text.secondary, fontSize: '0.875rem' }}>Receive email alerts for new assignments</div>
                        </div>
                        <Button size="sm">Enable</Button>
                    </div>
                </div>
            </Card>

            <div style={{ marginTop: theme.spacing.lg }}>
                 <Card title="Application Info">
                    <p>Version: 1.0.0</p>
                    <p>Environment: Production</p>
                 </Card>
            </div>
        </div>
    );
};

export default Settings;
