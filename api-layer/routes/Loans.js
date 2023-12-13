
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/Loans/LoanApplication/index');
const loanListcontroller = require('../controllers/Loans/index')
const LoanPaybackController = require('../controllers/Loans/LoanPayback')
router.post('/create-loan-application', loanController?.applyForLoan);
router.get('/get-loans-list/:id', loanListcontroller?.getLoansList);
router.post('/pay-loan-emi', LoanPaybackController?.loanpayback)

module.exports = router;
