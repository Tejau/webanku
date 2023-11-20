import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        // Send login data to the Node.js server
        const response = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          // Login successful
          const responseData = await response.json();
          console.log(responseData);

          // Optionally, you can navigate to another page or perform other actions
          let nav = `/user-dashboard?userid=${responseData?.userid}`;
          navigate(nav);
        } else {
          // Handle login errors
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
      <h2>User Login</h2>
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={!!emailError}
          />
          <FormFeedback>{emailError}</FormFeedback>
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
        <Button type="submit" color="primary">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default UserLogin;
