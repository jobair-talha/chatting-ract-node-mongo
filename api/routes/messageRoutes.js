const { sendMessage, getAllMessage } = require('../controller/message');
const { protect } = require('../middleware/authenticate');

const router = require('express').Router();

router.post('/', protect, sendMessage);
router.get('/:convoId', protect, getAllMessage);

module.exports = router;
