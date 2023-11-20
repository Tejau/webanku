import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const UserPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>WeBankU Bank Page</h1>
    <div style={{ marginTop: '20px' }}>
      <Link to="/create-bank">
        <Button color="primary" style={{ marginRight: '10px' }}>
          Register
        </Button>
      </Link>
      <Link to="/login-bank">
        <Button color="success">Login</Button>
      </Link>
    </div>
  </div>
);

export default UserPage;
