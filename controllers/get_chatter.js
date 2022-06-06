const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    const requestedName = req.params.name.toLowerCase();
    const userExist = await Chat_DB.exists({
      userName: requestedName,
    });
    if (!userExist) {
      throw new Error("Invalid User Name.");
    }
    const user_query = Chat_DB.find({
      userName: requestedName,
    });
    if (req.query.limit) {
      const limit_value = parseInt(req.query.limit);
      if (isNaN(limit_value)) {
        throw new Error("Query limit should be number");
      }
      user_query.limit(limit_value);
    }
    user_query.select("chatDate chatTime message -_id");
    const result = await user_query.exec();
    return res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ errorMessage: e.message });
  }
};
