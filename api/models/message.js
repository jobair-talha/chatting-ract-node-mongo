const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model('Message', MessageSchema);
module.exports = Message;
