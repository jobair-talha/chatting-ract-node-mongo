const router = require('express').Router();

// Users Routes
router.get('/health', (_req, res) => {
  res.json({ message: 'server Running' });
});
router.get('/', (_req, res) => {
  res.json({ message: 'Chatting App Api' });
});

router.use('/api/v1/users', require('./userRoutes'));
router.use('/api/v1/auth', require('./authRoutes'));
router.use('/api/v1/conversation', require('./conversation'));
router.use('/api/v1/message', require('./messageRoutes'));

module.exports = router;
