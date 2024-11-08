const User = require('./../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseHandler } = require('./../../helper/responseHandler');

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return responseHandler(res, 409, null, 'User with this email already exists', false);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ fullName, email, password: hashedPassword });

    // Generate a token for the user
    const payLoad = {
      email: user.email,
      fullName: user.fullName,
    };
    const token = jwt.sign(payLoad, 'your_secret_key', { expiresIn: '3d' });

    return responseHandler(res, 200, { payLoad, token }, 'User registered successfully', true);
  } catch (error) {
    console.log('Error occurred while registering user:', error);
    return responseHandler(res, 500, null, error.message, false);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return responseHandler(res, 404, null, 'User with this email does not exist', false);
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return responseHandler(res, 401, null, 'Incorrect password', false);
    }

    // Generate a token for the user
    const payLoad = {
      email: user.email,
      fullName: user.fullName,
    };
    const token = jwt.sign(payLoad, 'your_secret_key', { expiresIn: '3d' });

    return responseHandler(res, 200, { payLoad, token }, 'Login successful', true);
  } catch (error) {
    console.log('Error occurred during login:', error);
    return responseHandler(res, 500, null, error.message, false);
  }
};
