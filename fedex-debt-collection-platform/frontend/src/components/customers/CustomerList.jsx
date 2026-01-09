import React from 'react';
import CustomerCard from './CustomerCard';
import { theme } from '../../styles/theme';

const CustomerList = ({ customers, onAssign }) => {
    if (!customers || customers.length === 0) {
        return <div style={{ color: theme.colors.text.muted, textAlign: 'center' }}>No customers to show.</div>;
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: theme.spacing.lg
        }}>
            {customers.map(customer => (
                <CustomerCard key={customer.id} customer={customer} onAssign={onAssign} />
            ))}
        </div>
    );
};

export default CustomerList;
