const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    const message_count = await Chat_DB.estimatedDocumentCount();
    const boundary_messages = await Chat_DB.aggregate([
      {
        $group: {
          _id: null,
          first: { $first: "$$ROOT" },
          last: { $last: "$$ROOT" },
        },
      },
    ]);
    return res.status(200).json({
      messages_count: message_count,
      first_message: boundary_messages[0].first.chatDate,
      last_message: boundary_messages[0].last.chatDate,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
