import React from 'react';

const BalanceDisplay = ({ balance }) => {
  return (
    <div>
      <h4>Your Account Balance</h4>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
        ₹ {balance.toFixed(2)} {/* Assuming currency is Indian Rupees */}
      </p>
    </div>
  );
};

export default BalanceDisplay;