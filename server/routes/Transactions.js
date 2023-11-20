const express = require('express');
const router = express.Router();
const deposittransactionController = require('../controllers/Transactions/deposits')
const withdrawController = require('../controllers/Transactions/withdrawl')
// Create bank account endpoint
router.post('/deposit', deposittransactionController?.deposit);
router.post('/withdraw', withdrawController?.withdraw)

module.exports = router;
