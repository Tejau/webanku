const mongoose = require('mongoose');
const loanApplicationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum:['pending', 'approved', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  loanType:{type: String, enum:['education','vehicle', 'home'], required:false},
  term: { type: Number, required: true, enum: [3,6,12,24] },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount'},
  interestRate:{ type: Number, required:true}
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication;
