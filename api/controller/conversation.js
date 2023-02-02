const Conversation = require('../models/conversation');

const newConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const currentUserId = req.user._id;
    /*  const isConvoAlreadyCreated = await Conversation.find({
      members: { $all: [receiverId, currentUserId] },
    }); */
    const newConvo = new Conversation({ members: [currentUserId, receiverId] });
    const saveConvo = await newConvo.save();
    return res
      .status(201)
      .json({ msg: 'Conversation successfully created', saveConvo });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const userConversation = async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const userId = req.user.id;
      const conversations = await Conversation.find({
        members: { $in: [userId] },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res
      .status(403)
      .json({ msg: 'You can get only your own conversations' });
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.convoId);
    if (conversation.members.includes(req.user.id)) {
      return res.status(200).json(conversation);
    } else {
      return res
        .status(403)
        .json({ msg: 'This conversation does not include you' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  newConversation,
  userConversation,
  getConversation,
};
