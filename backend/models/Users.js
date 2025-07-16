const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: 'https://www.gravatar.com/avatar/'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
