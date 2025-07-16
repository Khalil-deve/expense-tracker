const router = require('express').Router();
const validateUser = require('../middlerwares/AuthMiddlewares/validateUser');
const validateLogin = require('../middlerwares/AuthMiddlewares/validateLogin');
const { upload } = require('../middlerwares/UploadMiddlewares/cloudinaryConfig');

const {signupUser} = require('../controllers/AuthController/signupUser');
const {loginUser} = require('../controllers/AuthController/loginUser');
const {forgotPassword} = require('../controllers/AuthController/forgotPassword');
const {resetPassword} = require('../controllers/AuthController/resetPassword');

// Signup Route
// Uses multer for file upload and express-validator for input validation 
router.post('/signup', upload.single('profilePic'), validateUser, signupUser );

// Login Route
// Uses express-validator for input validation
router.post('/login', validateLogin, loginUser);

// Forgot Password Route
// Uses nodemailer to send reset link via email
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);

module.exports = router;