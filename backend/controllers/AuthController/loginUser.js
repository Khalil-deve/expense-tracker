const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const isRealEmail = require('../../utils/isRealEmail');


exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    console.log('the error is: ', errors);
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  const valid = await isRealEmail(email);
  console.log('the value of a isRealEmail: ', valid);
  if (!valid) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      user: {
        userName: user.username,
        email: user.email,
        id: user._id,
        profileImage: user.profileImage
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}