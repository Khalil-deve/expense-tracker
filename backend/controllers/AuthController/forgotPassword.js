const sendResetEmail = require("../../utils/sendResetEmail");
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Forgot password request for email:', email);
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // ✅ Use the separate module
    await sendResetEmail(user.email, user.username, resetLink);

    return res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}