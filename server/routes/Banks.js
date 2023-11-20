// routes/bankRoutes.js

const express = require('express');
const router = express.Router();
const bankController = require('../controllers/Bank');
const bankdetailsController = require('../controllers/Bank/BankDetails')
const bankdemographicsController = require('../controllers/Bank/BankDemographics')
// Route to create a new bank
router.post('/create',bankController.createBank);
router.post('/login', bankController.loginBank)
router.get('/all',bankController.getAllBanks);
router.get('/bank-accounts/:bankId',bankdetailsController.getbankdetails)
router.get('/bankdemographics/:bankId', bankdemographicsController.demographics)

module.exports = router;