const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: mongoose.Schema.Types.Number, default: 0.0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bank: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
  accountType: { type: String, enum: ['savings', 'current'], required: true },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
