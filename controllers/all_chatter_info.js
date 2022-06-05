const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    // const uniqueUsers = (await Chat_DB.distinct("userID")).length;
    const uniqueUsers = await Chat_DB.aggregate([
      {
        $group: {
          _id: "distint",
          distinctValues: {
            $addToSet: "$userName",
          },
        },
      },
      {
        $project: {
          _id: 0,
          numDistinct: {
            $size: "$distinctValues",
          },
        },
      },
    ]);
    const uniqueSubs = (await Chat_DB.distinct("userID", { subscriber: true }))
      .length;
    const uniqueMods = (await Chat_DB.distinct("userID", { moderator: true }))
      .length;
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
      totall_chatters: uniqueUsers[0].numDistinct,
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
