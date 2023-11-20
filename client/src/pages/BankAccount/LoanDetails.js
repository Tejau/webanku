// src/components/LoanDetails.js

import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const LoanDetails = () => {
  // Fetch loan details from your data source or state
  const loanDetails = {
    loanAmount: 10000,
    emiAmount: 1200,
    remainingEmis: 6,
  };

  return (
    <div>
      <h3>Your Loan Details</h3>
      <p>
        Loan Amount: ₹ {loanDetails.loanAmount}
        <br />
        EMI Amount: ₹ {loanDetails.emiAmount}
        <br />
        Remaining EMIs: {loanDetails.remainingEmis}
      </p>
      <Input/>
      <Button color='primary'>Pay EMI</Button>
    </div>
  );
};

export default LoanDetails;
