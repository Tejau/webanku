const express = require('express');
const connectToDatabase = require('./config/db');
const cors = require('cors');
const transactionroutes = require('./routes/Transactions');
const startConsumer = require('./config/queue');
startConsumer();
connectToDatabase();
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5000'], 
  methods: 'GET,POST',
  credentials: true, 
}));

app.use('/',transactionroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
