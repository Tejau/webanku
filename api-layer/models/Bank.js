const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  location: { type: String, required: true },
  contact: {type: String, required: true},
  is_actively_giving_loans: {type: Boolean, default: true},
  salted_password:{type: String, required: false}

});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;