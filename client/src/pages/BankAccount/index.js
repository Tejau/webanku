// src/components/UserAccountPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap'; // Import reactstrap components
const UserAccountPage = () => {
  const location = useLocation();
  const accountId = new URLSearchParams(location.search).get('accountId');

  const [accountDetails, setAccountDetails] = useState({});
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [accountBalance, setaccountBalance] = useState(0);
  const [withdrawamount, setwithdrawAmount] = useState(0);
  const [withdrawamountError, setwithdrawAmountError] = useState('');

  const [depositAmount, setDepositAmount] = useState(0);
  const [amountdepositError, setDepositAmountError] = useState('');
  const [loans, setLoans] = useState([]);

  const [loanAmount, setLoanAmount] = useState('');
  const [loanType, setLoanType] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [loanAmountError, setLoanAmountError] = useState('');
  const [loanTypeError, setLoanTypeError] = useState('');
  const [loanTenureError, setLoanTenureError] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(''); // New state for application status


  
  const handleWithdrawal = async (e) => {
    e.preventDefault();

    // Validate amount
    let isValid = true;

    if (!withdrawamount.trim()) {
      setwithdrawAmountError('Amount is required');
      isValid = false;
    } else if (isNaN(withdrawamount) || parseFloat(withdrawamount) <= 0 || withdrawamount>=accountBalance ) {
      setwithdrawAmountError('Invalid amount');
      isValid = false;
    } else {
      setwithdrawAmountError('');
    }

    if (isValid) {
      try {
        // Perform withdrawal logic (send request to server)
        const response = await fetch(`http://localhost:5000/transactions/withdraw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: withdrawamount, id: accountId }),
        });

        if (response.ok) {
          // Reset form after successful withdrawal
          const data = await response.json();

          setaccountBalance(data?.newBalance)
          setwithdrawAmount('');
          
        } else {
          console.error('Error in withdrawal:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  
  
  const handleDeposit = async (e) => {
    e.preventDefault();

    // Validate amount
    let isValid = true;

    if (!depositAmount.trim()) {
      setDepositAmountError('Amount is required');
      isValid = false;
    } else if (isNaN(depositAmount) || parseFloat(depositAmount) <= 0) {
      setDepositAmountError('Invalid amount');
      isValid = false;
    } else {
      setDepositAmountError('');
    }

    if (isValid) {
      try {
        // Perform deposit logic (send request to server)
        const response = await fetch(`http://localhost:5000/transactions/deposit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: parseInt(depositAmount), id:accountId }),
        });

        if (response.ok) {
          const data = await response.json()
          setaccountBalance(data?.newBalance)
          // Reset form after successful deposit
          setDepositAmount('');
        } else {
          console.error('Error in deposit:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  const handleLoanApplication = async (e) => {
    e.preventDefault();

    // Validate Loan amount
    let isValid = true;

    if (!loanAmount.trim()) {
      setLoanAmountError('Loan Amount is required');
      isValid = false;
    } else if (isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      setLoanAmountError('Invalid loan amount');
      isValid = false;
    } else {
      setLoanAmountError('');
    }

    // Validate Loan type
    if (!loanType.trim()) {
      setLoanTypeError('Loan Type is required');
      isValid = false;
    } else {
      setLoanTypeError('');
    }

    // Validate Loan tenure
    if (!loanTenure.trim()) {
      setLoanTenureError('Loan Tenure is required');
      isValid = false;
    } else if (![3, 6, 12, 24].includes(parseInt(loanTenure))) {
      setLoanTenureError('Invalid loan tenure');
      isValid = false;
    } else {
      setLoanTenureError('');
    }

    if (isValid) {
      try {
        // Send loan application data to the Node.js server
        const response = await fetch('http://localhost:5000/loans/create-loan-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: loanAmount,
            loanType,
            term: parseInt(loanTenure), 
            accountId: accountId
            // Convert to integer
          }),
        });

        if (response.ok) {
          // Loan application submitted successfully
          const responseData = await response.json();
          console.log('Loan Application Response:', responseData);
          fetchLoans();

          // Reset form after successful loan application
          setLoanAmount('');
          setLoanType('');
          setLoanTenure('');
        } 
        else if (response.status === 403) {
          // Handle 403 Forbidden status (User not qualified)
          setApplicationStatus('notQualified');
        }
        else  {
          // Handle errors
          console.log('Error submitting loan application:', response.statusText);
        }
       
      
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch(`http://localhost:5000/loans/get-loans-list/${accountId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Loan data is,", data)
        setHasActiveLoan(data.loans.length>0);
        setLoans(data.loans);
      } else {
        console.error('Error fetching loans:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/bank-account/${accountId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("data is,",data?.data?.balance)
        setAccountDetails(data?.data);
        setaccountBalance(data?.data?.balance);
      } else {
        console.error('Error fetching account details:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handlePayback = async (loanId, emiAmount) => {
    try {
      const response = await fetch('http://localhost:5000/loanS/pay-loan-emi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loanId, emiAmount }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        fetchLoans();
        fetchAccountDetails()
        // Optionally, you can update the UI or show a success message
      } else {
        // Handle errors
        console.error('Error paying back loan EMI:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
   
    fetchAccountDetails();
    // fetchLoanDetails();
    fetchLoans();
  }, [accountId]);

  return (
    <Container>
      <h2 className="my-4">User Bank Account</h2>
      <Row>
        <Col md={6}>
          <div className="mb-4">
            <h3>Withdrawal</h3>
           <Form onSubmit={handleWithdrawal}>
      <FormGroup>
        <Label for="withdrawalAmount">Amount</Label>
        <Input
          type="number"
          id="withdrawalAmount"
          value={withdrawamount}
          onChange={(e) => setwithdrawAmount(e.target.value)}
          invalid={!!withdrawamountError}
        />
        <FormFeedback>{withdrawamountError}</FormFeedback>
      </FormGroup>
      <Button type="submit" color="danger">
        Withdraw
      </Button>
    </Form>
          </div>
          <div className="mb-4">
            <h3>Deposit</h3>
    <Form onSubmit={handleDeposit}>
      <FormGroup>
        <Label for="depositAmount">Amount</Label>
        <Input
          type="number"
          id="depositAmount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          invalid={!!amountdepositError}
        />
        <FormFeedback>{amountdepositError}</FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Deposit
      </Button>
    </Form>          
    </div>
          <div>
           
      <h4>Your Account Balance</h4>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
        ₹ {accountBalance?.toFixed(2)} 
      </p>
          </div>
        </Col>
        <Col md={6}>
          {hasActiveLoan ? (
            <div>
            <h3>Loan List</h3>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <Card key={loan._id} className="mb-3">
                  <CardBody>
                    <CardTitle>Loan Type: {loan.loanType}</CardTitle>
                    <p>Amount: {loan.amount}</p>
                    <p>Interest Rate: {loan.interestRate}</p>
                    <p>EMI Amount: {loan?.emi.toFixed(2)}</p>
                    <p>Term: {loan.term} months</p>
                    <p>Paid Times: {loan.paid_times} times </p>
                    {(loan.term > loan.paid_times) ?(<Button color="success" onClick={() => handlePayback(loan._id, loan?.emi.toFixed(2))}>
                    Payback
              </Button>):null}

                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No loans found for this account.</p>
            )}
          </div>
          ) : (
            <div className="mb-4">
              <h3>Apply for Loan</h3>
              <Form onSubmit={handleLoanApplication}>
      <FormGroup>
        <Label for="LoanAmount">Loan Amount</Label>
        <Input
          type="number"
          id="LoanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          invalid={!!loanAmountError}
        />
        <FormFeedback>{loanAmountError}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="LoanType">Loan Type</Label>
        <Input
          type="select"
          id="LoanType"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
          invalid={!!loanTypeError}
        >
          <option value="">Select Loan Type</option>
          <option value="education">Education</option>
          <option value="vehicle">Vehicle</option>
          <option value="home">Home</option>
        </Input>
        <FormFeedback>{loanTypeError}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="LoanTenure">Loan Tenure</Label>
        <Input
          type="select"
          id="LoanTenure"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          invalid={!!loanTenureError}
        >
          <option value="">Select Loan Tenure</option>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="12">12 months</option>
          <option value="24">24 months</option>
        </Input>
        <FormFeedback>{loanTenureError}</FormFeedback>
      </FormGroup>

      <Button type="submit" color="primary">
        Apply for Loan
      </Button>

      {/* Display the message if the application is rejected */}
      {applicationStatus === 'notQualified' && (
          <p style={{ color: 'red' }}>You are not qualified for the loan.</p>
        )}
    </Form>
            </div>
          )}
        </Col>
      </Row>
      {/* <div className="mt-4">
        <Link to="/">
          <Button color="primary">Back to Home</Button>
        </Link>
      </div> */}
    </Container>
  );
};

export default UserAccountPage;
