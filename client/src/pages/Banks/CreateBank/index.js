import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CreateBank = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [contactError, setContactError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    // Validate location
    if (!location.trim()) {
      setLocationError('Location is required');
      isValid = false;
    } else {
      setLocationError('');
    }

    // Validate contact
    if (!contact.trim()) {
      setContactError('Contact is required');
      isValid = false;
    } else {
      setContactError('');
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
        // Send bank creation data to the Node.js server
        const response = await fetch('http://localhost:5000/banks/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            location,
            contact,
            password,
          }),
        });

        if (response.ok) {
          // Bank created successfully
          const responseData = await response.json();
          console.log(responseData);

          // Optionally, you can navigate to another page or show a success message
          navigate(`/bank-details?bankId=${responseData?.bank?._id}`);
        } else {
          // Handle errors
          console.error('Error creating bank:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create Bank</h2>
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
          <Label for="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            invalid={!!locationError}
          />
          <FormFeedback>{locationError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="contact">Contact</Label>
          <Input
            type="tel"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            invalid={!!contactError}
          />
          <FormFeedback>{contactError}</FormFeedback>
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
          Create Bank
        </Button>
      </Form>
    </div>
  );
};

export default CreateBank;
