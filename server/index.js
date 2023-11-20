const express = require('express');
const connectToDatabase = require('./config/db');
const models = require('./models');
const userRoutes = require('./routes/UserRoutes'); // Add this line
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
  origin: ['http://example.com', 'http://localhost:3000'], // Replace with your allowed origins
  methods: 'GET,POST',
  credentials: true, // Enable credentials (if needed)
}));


app.use('/users', userRoutes); // Add this line
app.use('/banks', bankRoutes);
app.use('/bank-account',bankaccountroutes);
app.use('/transactions',transactionroutes);
app.use('/loans',loanRoutes);
// Connect to the database

// Now you can access your models using the 'models' object
// For example:

// Your routes and middleware go here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
