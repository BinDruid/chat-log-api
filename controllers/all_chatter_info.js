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
    const date_start_result = await Chat_DB.find({})
      .select("chatDate -_id")
      .sort({ chatDate: "asc" })
      .limit(1);
    const date_end_result = await Chat_DB.find({})
      .select("chatDate -_id")
      .sort({ chatDate: "desc" })
      .limit(1);
    return res.status(200).json({
      totall_chatters: uniqueUsers,
      totall_subs: uniqueSubs,
      totall_mods: uniqueMods,
      startDate: date_start_result[0].chatDate,
      endDate: date_end_result[0].chatDate,
    });
  } catch (e) {
    res.status(400).json({ errorMessage: e.message });
  }
};

const getUniqueItemsBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
