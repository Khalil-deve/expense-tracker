const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const isRealEmail = require('../../utils/isRealEmail');


exports.signupUser = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const errors = validationResult(req);
  const imageUrl = req.file.path;
  console.log('the Image Url is:', imageUrl);
  // Check if file is provided
  if (!imageUrl) {
    return res.status(400).json({ message: 'Profile image is required' });
  }
  // Check for validation errors
  if (!errors.isEmpty()) {
    console.log('the error is: ', errors);
    return res.status(400).json({ message: errors.array() });
  }

  const { userName, email, password } = req.body;
  console.log('username: ', userName + 'Password: ', password);

  const valid = await isRealEmail(email);

  if (!valid) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }


  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to DB
    const newUser = new User({
      username: userName,
      email,
      password: hashedPassword,
      profileImage: imageUrl
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // expires in 1 hour
    );

    // Send response with token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        userName: newUser.username,
        email: newUser.email,
        id: newUser._id,
        profileImage: newUser.profileImage
      },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}