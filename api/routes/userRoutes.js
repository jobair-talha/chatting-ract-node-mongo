const { allUsers } = require('../controller/user');

const router = require('express').Router();

// Users Routes
router.get('/', allUsers);

module.exports = router;
