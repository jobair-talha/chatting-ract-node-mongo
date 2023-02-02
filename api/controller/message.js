const Message = require('../models/message');

const sendMessage = async (req, res) => {
  const { messageText, conversationId } = req.body;
  const newMessage = new Message({
    messageText,
    senderId: req.user.id,
    conversationId,
  });
  try {
    const saveMessage = await newMessage.save();
    return res.status(201).json(saveMessage);
  } catch (error) {
    console.error(error);
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.convoId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllMessage,
  sendMessage,
};
