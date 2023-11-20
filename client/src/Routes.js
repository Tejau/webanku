
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/UserPortal/CreateUser';
import CreateAccount from './pages/BankAccount/CreateBankAccount';
import BankAccount from './pages/BankAccount'
import BankDetails from './pages/Banks/index'
import Home from './pages/Home'
import UserPortal from './pages/UserPortal'
import UserLogin from './pages/UserPortal/UserLogin'
import UserDashboard from './pages/UserPortal/Userdashboard';
import BankRegister from './pages/Banks/CreateBank'
import BankLogin from './pages/Banks/LoginBank'
import BankPortal from './pages/BankPortal/index'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-bank-account" element={<CreateAccount/>}/>
        <Route path="/user-bank-account" element={<BankAccount/>} />
        <Route path="/" element={<Home />} />
        <Route path="/bank-details" element={<BankDetails/>}/>
        <Route path="/user-portal" element={<UserPortal/>}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/create-bank" element={<BankRegister/>}/>
        <Route path="/login-bank" element={<BankLogin/>}/>
        <Route path='/bank-portal' element={<BankPortal/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
