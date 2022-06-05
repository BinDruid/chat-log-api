const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    const userExist = await Chat_DB.exists({
      userName: req.params.name.toLowerCase(),
    });
    if (!userExist) {
      throw new Error("Invalid User Name.");
    }
    const user_query = Chat_DB.find({
      userName: req.params.name.toLowerCase(),
    });
    user_query.select("chatDate chatTime message -_id");
    if (req.query.limit) {
      const limit_value = parseInt(req.query.limit);
      if (isNaN(limit_value)) {
        throw new Error("Query limit should be number");
      }
      user_query.limit(limit_value);
    }
    const result = await user_query.exec();
    return res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ errorMessage: e.message });
  }
};
