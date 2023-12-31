
const express = require('express');
const router = express.Router();
const bankAccountController = require('../controllers/Accounts/CheckingAccount/index');

router.post('/create', bankAccountController.createBankAccount);
router.get('/:accountId', bankAccountController.getAccountDetails);
router.get('/getByUser/:userId', bankAccountController.getByUser);

module.exports = router;
