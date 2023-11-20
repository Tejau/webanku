// src/components/WithdrawalForm.js

import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const WithdrawalForm = () => {
  const [withdrawamount, setwithdrawAmount] = useState('');
  const [withdrawamountError, setwithdrawAmountError] = useState('');

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    // Validate amount
    let isValid = true;

    if (!withdrawamount.trim()) {
      setwithdrawAmountError('Amount is required');
      isValid = false;
    } else if (isNaN(withdrawamount) || parseFloat(withdrawamount) <= 0) {
      setwithdrawAmountError('Invalid amount');
      isValid = false;
    } else {
      setwithdrawAmountError('');
    }

    if (isValid) {
      // Perform withdrawal logic (e.g., send request to server)
      console.log('Withdrawal:', withdrawamount);
      // Reset form after successful withdrawal
      setwithdrawAmount('');
    }
  };

  return (
    <Form onSubmit={handleWithdrawal}>
      <FormGroup>
        <Label for="withdrawalAmount">Amount</Label>
        <Input
          type="number"
          id="withdrawalAmount"
          value={withdrawamount}
          onChange={(e) => setwithdrawAmount(e.target.value)}
          invalid={!!withdrawamountError}
        />
        <FormFeedback>{withdrawamountError}</FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Withdraw
      </Button>
    </Form>
  );
};

export default WithdrawalForm;
