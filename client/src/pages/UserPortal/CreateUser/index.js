import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    let isValid = true;

    // Validate fullName
    if (!fullName.trim()) {
      setFullNameError('Full Name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate age
    if (!age.trim()) {
      setAgeError('Age is required');
      isValid = false;
    } else if (isNaN(age) || parseInt(age) <= 0) {
      setAgeError('Invalid age');
      isValid = false;
    } else {
      setAgeError('');
    }

    // Validate gender
    if (!gender) {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }

    // Validate city
    if (!city.trim()) {
      setCityError('City is required');
      isValid = false;
    } else {
      setCityError('');
    }

    // Validate state
    if (!state.trim()) {
      setStateError('State is required');
      isValid = false;
    } else {
      setStateError('');
    }

    // Validate phoneNumber
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Invalid phone number');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    // Validate address
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }

    // Validate passwords
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      try {
        // Send user data to the Node.js server
        const response = await fetch('http://127.0.0.1:5000/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            age,
            gender,
            City: city,
            State: state,
            phoneNumber,
            address,
            password,
          }),
        });

        if (response.ok) {
          // User created successfully
          const responseData = await response.json();
          console.log(responseData?.userid);
          navigate(`/user-dashboard?userid=${responseData?.userid}`);
        } else {
          // Handle errors
          console.error('Error creating user:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate phone number format
  const isValidPhoneNumber = (phoneNumber) => {
    // Use a regular expression for basic phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create User</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            invalid={!!fullNameError}
          />
          <FormFeedback>{fullNameError}</FormFeedback>
        </FormGroup>
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
          <Label for="age">Age</Label>
          <Input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            invalid={!!ageError}
          />
          <FormFeedback>{ageError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            type="select"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            invalid={!!genderError}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Input>
          <FormFeedback>{genderError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            invalid={!!cityError}
          />
          <FormFeedback>{cityError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            invalid={!!stateError}
          />
          <FormFeedback>{stateError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            invalid={!!phoneNumberError}
          />
          <FormFeedback>{phoneNumberError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            invalid={!!addressError}
          />
          <FormFeedback>{addressError}</FormFeedback>
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
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            invalid={!!confirmPasswordError}
          />
          <FormFeedback>{confirmPasswordError}</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary" style={{ marginTop: '20px', display: 'block', margin: '0 auto' }}>
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
