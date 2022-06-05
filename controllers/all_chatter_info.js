const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    const uniqueUsers = (await Chat_DB.distinct("userID")).length;
    const subs_query = Chat_DB.find({ subscriber: true });
    const uniqueSubs = (await Chat_DB.distinct("userID", subs_query)).length;
    const mods_query = Chat_DB.find({ moderator: true });
    const uniqueMods = (await Chat_DB.distinct("userID", mods_query)).length;

    // const user_result = await Chat_DB.find({}).select("userName -_id");
    // const uniqueUsers = (getUniqueItemsBy(user_result, "userName")).length;
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
      totall_chatters: uniqueUsers,
      totall_subs: uniqueSubs,
      totall_mods: uniqueMods,
      startDate: boundary_messages[0].first.chatDate,
      endDate: boundary_messages[0].last.chatDate,
    });
  } catch (e) {
    res.status(400).json({ errorMessage: e.message });
  }
};

const getUniqueItemsBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
