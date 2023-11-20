import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>WeBankU</h1>
    <div style={{ marginTop: '30px' }}>
      <Link to="/user-portal">
        <Button color="primary" style={{ marginRight: '30px' }}>
          User Portal
        </Button>
      </Link>
      <Link to="/create-bank-account">
        <Button color="success">Bank Portal</Button>
      </Link>
    </div>
  </div>
);

export default Home;
