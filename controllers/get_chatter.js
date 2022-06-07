const Chat_DB = require("../models/chat_message");
const mapName = require("../util/mapName");
const checkExist = require("../util/checkExist");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  try {
    const requestedName = req.params.name.toLowerCase();
    await checkExist("userName", requestedName);
    const user_query = Chat_DB.find({
      userName: requestedName,
    });
    if (req.query.limit) {
      const limit_value = parseInt(req.query.limit);
      if (isNaN(limit_value))
        throw new UserError("Query limit should be number.");
      user_query.limit(limit_value);
    }
    user_query.select("chatDate chatTime message -_id");
    const result = await user_query.exec();
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof UserError) {
      res.status(400).json({ [error.name]: error.message });
    } else res.status(500).json({ [error.name]: error.message });
  }
};
