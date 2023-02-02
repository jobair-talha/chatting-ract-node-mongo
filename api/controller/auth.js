const bcrypt = require('bcrypt');
const User = require('../models/useModel');
const { registerService } = require('../services/auth');
const generateToken = require('../services/token');

const register = async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  if ((!username || !email || !password, !phone)) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'user already exits' });
    }

    const user = await registerService({
      username,
      email,
      password,
      phone,
    });

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
      role: user.role,
    };

    return res.status(201).json(userData);
  } catch (error) {
    next();
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  try {
    // Check for user phone
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        ...userData,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid Password' });
    }
  } catch (error) {
    next();
  }
};

module.exports = {
  register,
  login,
};
