const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');

module.exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) return res.status(400).json({ message: "Password is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log('Decoded user ID:', decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash and save new password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset token error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
}