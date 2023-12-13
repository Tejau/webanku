const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  term: { type: Number, required: true, enum:[3,6,12,24] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount'},
  loanType:{type: String, enum:['education','vehicle', 'home'], required:false},
  is_active:{type: Boolean, default: true},
  paid_times: {type:Number, default:0},
  emi: {type:Number, default:0}
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
