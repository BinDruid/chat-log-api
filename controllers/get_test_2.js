const Chat_DB = require("../models/chat_message");
const mapName = require("../util/mapName");
const checkExist = require("../util/checkExist");
const getTopWords = require("../util/getTopWords");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  let query = {};
  try {
    for (const queryField of Object.keys(req.query)) {
      const dbField = mapName(queryField);
      query[dbField] = req.query[queryField];
      await checkExist(dbField, req.query[queryField]);
    }
    const allMessages = await Chat_DB.find(query).select("message -_id");
    const occurrence = 10;
    const result = getTopWords(allMessages, occurrence);
    if (!Object.keys(result).length)
      throw new UserError(
        `All of the words have occurrence lower than ${occurrence} times.`
      );
    return res.status(200).json({ topWords: result });
  } catch (error) {
    if (error instanceof UserError)
      res.status(400).json({ [error.name]: error.message });
    else res.status(500).json({ [error.name]: error.message });
  }
};
