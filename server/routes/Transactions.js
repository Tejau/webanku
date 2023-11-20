const express = require('express');
const router = express.Router();
const deposittransactionController = require('../controllers/Transactions/deposits')
const withdrawController = require('../controllers/Transactions/withdrawl')
router.post('/deposit', deposittransactionController?.deposit);
router.post('/withdraw', withdrawController?.withdraw)

module.exports = router;
