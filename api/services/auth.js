const bcrypt = require('bcrypt');
const { createNewUser } = require('./user');

const registerService = async ({ username, email, password, phone }) => {
  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return createNewUser({
    username,
    email,
    password: hashedPassword,
    phone,
  });
};

module.exports = {
  registerService,
};
