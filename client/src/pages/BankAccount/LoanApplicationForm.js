// src/components/LoanApplicationForm.js

import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const LoanApplicationForm = () => {
  const [Loanamount, setLoanAmount] = useState('');
  const [LoanamountError, setLoanAmountError] = useState('');

  const handleLoanApplication = async (e) => {
    e.preventDefault();

    // Validate Loanamount
    let isValid = true;

    if (!Loanamount.trim()) {
      setLoanAmountError(' Loan Amount is required');
      isValid = false;
    } else if (isNaN(Loanamount) || parseFloat(Loanamount) <= 0) {
      setLoanAmountError('Invalid loan amount');
      isValid = false;
    } else {
      setLoanAmountError('');
    }

    if (isValid) {
      // Perform loan application logic (e.g., send request to server)
      console.log('Loan Application:', Loanamount);
      // Reset form after successful loan application
      setLoanAmount('');
    }
  };

  return (
    <Form onSubmit={handleLoanApplication}>
      <FormGroup>
        <Label for="LoanAmount">Loan LoanAmount</Label>
        <Input
          type="number"
          id="LoanAmount"
          value={Loanamount}
          onChange={(e) => setLoanAmount(e.target.value)}
          invalid={!!LoanamountError}
        />
        <FormFeedback>{LoanamountError}</FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Apply for Loan
      </Button>
    </Form>
  );
};

export default LoanApplicationForm;
