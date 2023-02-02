const User = require('../models/useModel');

const allUsers = async (req, res, next) => {
  try {
    const users = await User.paginate(
      {},
      { page: req.query.page, limit: req.query.limit }
    );

    res.status(200).json(users);
  } catch (error) {
    next();
  }
};

const newUser = async (_req, res, next) => {
  try {
    const makeUser = new User({
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      phone: '01724721383',
      password: 'fdadf4546fddaf',
    });
    await makeUser.save();

    res.status(200).json({ message: 'user create successfully' });
  } catch (error) {
    next();
  }
};

module.exports = {
  allUsers,
  newUser,
};
