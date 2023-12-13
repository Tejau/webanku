const mongoose = require('mongoose');

const loanPaybackSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

const LoanPayback = mongoose.model('LoanPayback', loanPaybackSchema);

module.exports = LoanPayback;
