const express = require('express');
const connectToDatabase = require('./config/db');
const models = require('./models');
const userRoutes = require('./routes/UserRoutes'); 
const cors = require('cors');
const bankRoutes = require('./routes/Banks');
const bankaccountroutes = require('./routes/BankAccounts')
const transactionroutes = require('./routes/Transactions')
const loanRoutes = require('./routes/Loans')
connectToDatabase();
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://example.com', 'http://localhost:3000'], 
  methods: 'GET,POST',
  credentials: true, 
}));


app.use('/users', userRoutes); // Add this line
app.use('/banks', bankRoutes);
app.use('/bank-account',bankaccountroutes);
app.use('/transactions',transactionroutes);
app.use('/loans',loanRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
