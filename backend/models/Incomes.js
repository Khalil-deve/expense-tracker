const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  icon: {
    type: String,
    default: '💰'
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Income', incomeSchema);
