import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const BankLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        // Send login data to the Node.js server
        const response = await fetch('http://localhost:5000/banks/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
          }),
        });

        if (response.ok) {
          // Login successful
          const responseData = await response.json();
          console.log(responseData);

          // Optionally, you can navigate to another page or show a success message
          navigate(`/bank-details?bankId=${responseData?.bank?._id}`);
        } else {
          // Handle errors
          const errorData = await response.json();
          setServerError(errorData.message || 'Error logging in');
        }
      } catch (error) {
        console.error('Error:', error);
        setServerError('Error logging in');
      }
    }
  };

  return (
    <div>
      <h2>Bank Login</h2>
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            invalid={!!nameError}
          />
          <FormFeedback>{nameError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={!!passwordError}
          />
          <FormFeedback>{passwordError}</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary" style={{ marginTop: '20px', display: 'block', margin: '0 auto' }}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default BankLogin;
