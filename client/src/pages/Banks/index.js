import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {Button} from 'reactstrap'

const BankDetailsPage = () => {
  // const { bankId } = useParams();
  const [bankDetails, setBankDetails] = useState({});
  const [bankAccounts, setBankAccounts] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const location = useLocation();
  const bankId = new URLSearchParams(location.search).get('bankId');
  const [demographics, setDemographics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

  
  
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/banks/bank-accounts/${bankId}`);
        const data = await response.json();

        // Update state with fetched data
        setBankDetails(data.bank);
        setBankAccounts(data.bankAccounts);
        setUniqueUsers(data.uniqueUsers);
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };
    getDemographics()

    // Call the fetchBankDetails function
    fetchBankDetails();
  }, [bankId]); // Run this effect whenever bankId changes
  const getDemographics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/banks/bankdemographics/${bankId}`);
      const data = await response.json();

      if (data.success) {
        setDemographics(data.data);
        setError(null);
      } else {
        setDemographics(null);
        setError(data.message);
      }
    } catch (error) {
      setDemographics(null);
      setError('Error retrieving data');
    }
  };
  return (
    <div>
      {/* <h2>Bank Details</h2> */}

      <div>
        <h3>Welcome, {bankDetails.name}</h3>
        <p></p>
        <p>Contact: {bankDetails.contact}</p>
        <p>Location: {bankDetails.location}</p>
      </div>

      <div>
        <h3>Bank Accounts</h3>
        {bankAccounts.length > 0 ? (
  bankAccounts.map((account) => (
    <div key={account._id}>
      <p>Account Number: {account.accountNumber}</p>
      <p>Account Holder: {account?.user?.fullName}</p>
      <p>Account Type: <span style={{ color: account.accountType === 'savings' ? 'blue' : 'green' }}>{account.accountType}</span></p>
      <p>Balance: {account.balance}</p>
    </div>
  ))
) : (
  <p>No bank accounts found for this bank.</p>
)}
      </div>

      <div>
        <h3>Unique Users</h3>
        {uniqueUsers.length > 0 ? (
          uniqueUsers.map((user) => (
            <div key={user._id}>
              <p>Full Name: {user.fullName}</p>
              <p>Email: {user.email}</p>
            </div>
          ))
        ) : (
          <p>No unique users found for this bank.</p>
        )}
      </div>
      <div>
      <h1>Bank Demographics</h1>

      <Button onClick={getDemographics}>Get Demographics</Button>

      {demographics && (
        <div>
          <p>Average Age: {demographics.average_age}</p>
          <p>Average Salary: {demographics.average_salary}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
    </div>
  );
};

export default BankDetailsPage;
