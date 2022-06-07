const Chat_DB = require("../models/chat_message");
const mapName = require("../util/mapName");
const checkExist = require("../util/checkExist");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  let query = {};
  let result = {};
  try {
    for (const queryField of Object.keys(req.query)) {
      const dbField = mapName(queryField);
      query[dbField] = req.query[queryField];
      await checkExist(dbField, req.query[queryField]);
    }
    const boundary_messages = await Chat_DB.aggregate([
      {
        $group: {
          _id: null,
          first: { $first: "$$ROOT" },
          last: { $last: "$$ROOT" },
        },
      },
    ]);
    result.first_message = boundary_messages[0].first.chatDate;
    result.last_message = boundary_messages[0].last.chatDate;
    result.messages_count = await Chat_DB.find(query).countDocuments();
    query.subscriber = true;
    result.sub_messages_count = await Chat_DB.find(query).countDocuments();
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof UserError) {
      res.status(400).json({ [error.name]: error.message });
    } else res.status(500).json({ [error.name]: error.message });
  }
};
