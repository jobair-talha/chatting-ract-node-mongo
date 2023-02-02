const User = require('../models/useModel');

const createNewUser = ({ username, email, password, phone }) => {
  const user = new User({
    username,
    email,
    password,
    phone,
  });
  return user.save();
};

module.exports = {
  createNewUser,
};
