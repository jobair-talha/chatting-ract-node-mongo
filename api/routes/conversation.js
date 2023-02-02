const {
  newConversation,
  userConversation,
  getConversation,
} = require('../controller/conversation');
const { protect } = require('../middleware/authenticate');

const router = require('express').Router();

router.post('/', protect, newConversation);
router.get('/find/:userId', protect, userConversation);
router.get('/:convoId', protect, getConversation);

module.exports = router;
