// src/components/CreateAccount.js

import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAccount = () => {
  // const { userid } = useParams(); // Get userid from URL params
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState('');
  const [accountType, setAccountType] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [userid,setuserid] = useState('')
  const [bankError, setBankError] = useState('');
  const [accountTypeError, setAccountTypeError] = useState('');
  const [initialBalanceError, setInitialBalanceError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;

    // Create a URLSearchParams object from the URL
    const params = new URLSearchParams(document.location.search)
    console.log(params)
    // Get the value of the 'userid' parameter
    const currentuserid = params.get('userid');
    console.log(currentuserid)
    setuserid(currentuserid)


    // Fetch the list of banks from the server
    const fetchBanks = async () => {
      try {
        const response = await fetch('http://localhost:5000/banks/all');
        if (response.ok) {
          const data = await response.json();
          setBanks(data.banks);
        } else {
          console.error('Error fetching banks:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBanks();
  }, []); // Run this effect only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    let isValid = true;
    console.log("bank is",bank)
    console.log("user id is,", userid)
    if (!bank.trim()) {
      setBankError('Bank is required');
      isValid = false;
    } else {
      setBankError('');
    }

    if (!accountType.trim()) {
      setAccountTypeError('Account Type is required');
      isValid = false;
    } else {
      setAccountTypeError('');
    }

    if (!initialBalance.trim()) {
      setInitialBalanceError('Initial Balance is required');
      isValid = false;
    } else if (isNaN(initialBalance) || parseFloat(initialBalance) < 0) {
      setInitialBalanceError('Invalid initial balance');
      isValid = false;
    } else {
      setInitialBalanceError('');
    }

    if (isValid) {
      try {
        // Send account data to the Node.js server
        const response = await fetch('http://localhost:5000/bank-account/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bankId: bank,
            accountType,
            initialBalance,
            userId: userid,
          }),
        });

        if (response.ok) {
          // Account created successfully
          const responseData = await response.json();
          console.log(responseData);
          let nav = `/user-dashboard?userid=${responseData?.bankAccount?.user}`

          // Optionally, you can navigate to another page or show a success message
          navigate(nav);
        } else {
          // Handle errors
          console.error('Error creating account:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create Bank Account</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="bank">Bank</Label>
          <Input
            type="select"
            id="bank"
            value={bank}
            onChange={(e) => {setBank(e.target.value); console.log(e.target.value)}}
            invalid={!!bankError}
          >
            <option value="" disabled>Select Bank</option>
            {banks.map((bank) => (
              <option key={bank._id} value={bank._id}>
                {bank.name} - {bank.location}
              </option>
            ))}
          </Input>
          <FormFeedback>{bankError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="accountType">Account Type</Label>
          <Input
            type="select"
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            invalid={!!accountTypeError}
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Checking Account</option>
          </Input>
          <FormFeedback>{accountTypeError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="initialBalance">Initial Balance</Label>
          <Input
            type="number"
            id="initialBalance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            invalid={!!initialBalanceError}
          />
          <FormFeedback>{initialBalanceError}</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default CreateAccount;
