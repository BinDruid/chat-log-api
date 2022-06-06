const Chat_DB = require("../models/chat_message");

module.exports = async (req, res) => {
  try {
    const userMsgCountsAgg = await Chat_DB.aggregate([
      { $match: { subscriber: true } },
      { $count: "Totall Messages sent in chat" },
    ]);
    const userMsgCountsDate = await Chat_DB.aggregate([
      { $group: { _id: "$chatDate", messageCount: { $count: {} } } },
    ]);
    const o = {};
    o.map = function () {
      emit(this.chatDate, this.message);
    };
    o.reduce = function (k, vals) {
      return vals.length;
    };
    const test_value = await Chat_DB.mapReduce(o);
    console.log(test_value);

    return res.status(200).json({ userMsgCountsAgg, userMsgCountsDate });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};
