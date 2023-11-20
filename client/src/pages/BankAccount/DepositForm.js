// src/components/DepositForm.js

import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const DepositForm = () => {
  const [depositamount, setAmountDeposited] = useState('');
  const [amountdepositError, setAmountDepositError] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Validate amount
    let isValid = true;

    if (!depositamount.trim()) {
      setAmountDepositError('Amount is required');
      isValid = false;
    } else if (isNaN(depositamount) || parseFloat(depositamount) <= 0) {
      setAmountDepositError('Invalid amount');
      isValid = false;
    } else {
      setAmountDepositError('');
    }

    if (isValid) {
      // Perform deposit logic (e.g., send request to server)
      console.log('Deposit:', depositamount);
      // Reset form after successful deposit
      setAmountDeposited('');
    }
  };

  return (
    <Form onSubmit={handleDeposit}>
      <FormGroup>
        <Label for="depositAmount">Amount</Label>
        <Input
          type="number"
          id="depositAmount"
          value={depositamount}
          onChange={(e) => setAmountDeposited(e.target.value)}
          invalid={!!amountdepositError}
        />
        <FormFeedback>{amountdepositError}</FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Deposit
      </Button>
    </Form>
  );
};

export default DepositForm;
