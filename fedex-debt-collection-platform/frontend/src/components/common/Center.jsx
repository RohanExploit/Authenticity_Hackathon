import React from 'react';

const Center = ({ children, style = {} }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      ...style
    }}>
      {children}
    </div>
  );
};

export default Center;
