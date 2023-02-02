const { Schema, model, Types } = require('mongoose');

const ConversationSchema = new Schema(
  {
    members: {
      type: [Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
