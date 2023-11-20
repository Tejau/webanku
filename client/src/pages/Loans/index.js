// src/components/LoanList.js
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const LoanList = ({ accountId }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`http://localhost:5000/loans/getByAccount/${accountId}`);
        if (response.ok) {
          const data = await response.json();
          setLoans(data.loans);
        } else {
          console.error('Error fetching loans:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLoans();
  }, [accountId]);

  return (
    <div>
      <h3>Loan List</h3>
      {loans.length > 0 ? (
        loans.map((loan) => (
          <Card key={loan._id} className="mb-3">
            <CardBody>
              <CardTitle>Loan Type: {loan.loanType}</CardTitle>
              <p>Amount: {loan.amount}</p>
              <p>Interest Rate: {loan.interestRate}</p>
              <p>Term: {loan.term} months</p>
            </CardBody>
          </Card>
        ))
      ) : (
        <p>No loans found for this account.</p>
      )}
    </div>
  );
};

export default LoanList;
