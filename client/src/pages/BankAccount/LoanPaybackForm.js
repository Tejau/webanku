// src/components/LoanPaybackForm.js

import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const LoanPaybackForm = ({ onPayback }) => {
  const [paybackAmount, setPaybackAmount] = useState('');
  const [paybackAmountError, setPaybackAmountError] = useState('');

  const handlePayback = (e) => {
    e.preventDefault();

    // Validate payback amount
    let isValid = true;

    if (!paybackAmount.trim()) {
      setPaybackAmountError('Payback Amount is required');
      isValid = false;
    } else if (isNaN(paybackAmount) || parseFloat(paybackAmount) <= 0) {
      setPaybackAmountError('Invalid payback amount');
      isValid = false;
    } else {
      setPaybackAmountError('');
    }

    if (isValid) {
      // Pass the payback amount to the parent component
      onPayback(parseFloat(paybackAmount));
      // Reset form after successful payback
      setPaybackAmount('');
    }
  };

  return (
    <div>
      <h4>Loan Payback</h4>
      <Form onSubmit={handlePayback}>
        <FormGroup>
          <Label for="paybackAmount">Payback Amount</Label>
          <Input
            type="number"
            id="paybackAmount"
            value={paybackAmount}
            onChange={(e) => setPaybackAmount(e.target.value)}
            invalid={!!paybackAmountError}
          />
          <FormFeedback>{paybackAmountError}</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary">
          Payback
        </Button>
      </Form>
    </div>
  );
};

export default LoanPaybackForm;
