// src/pages/UserDashboard.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

const UserDashboard = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [userid, setuserid] = useState('');
  const [navigateTo, setnavigateTo] = useState('/create-bank-account');
  const navigate = useNavigate();

  // Fetch user's bank accounts when the component mounts
  useEffect(() => {
    const fetchBankAccounts = async () => {
      const params = new URLSearchParams(document.location.search);
      const currentUserId = params.get('userid');
      setuserid(currentUserId);
      setnavigateTo('/create-bank-account?userid=' + currentUserId);
      try {
        // Fetch the list of user's bank accounts from the server
        const response = await fetch(`http://localhost:5000/bank-account/getByUser/${currentUserId}`);
        if (response.ok) {
          const data = await response.json();
          setBankAccounts(data.bankAccounts);
        } else {
          console.error('Error fetching bank accounts:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBankAccounts();
  }, []);

  const handleAccountClick = (accountId) => {
    navigate(`/user-bank-account?accountId=${accountId}`);
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">User Dashboard</h2>
      <Row>
        <Col md={8}>
          <h3>Your Bank Accounts</h3>
          {bankAccounts.length > 0 ? (
            bankAccounts.map((account) => (
              <Card key={account._id} className="mb-3" onClick={() => handleAccountClick(account._id)}>
                <CardBody>
                  <p className="mb-0">
                    {account.bank.name}, {account.accountType} Account, Balance: {account.balance}
                  </p>
                </CardBody>
              </Card>
            ))
          ) : (
            <p>No bank accounts found. Create a new account below.</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={navigateTo}>
            <Button color="primary">Create New Bank Account</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
