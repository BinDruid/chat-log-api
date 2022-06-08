const Chat_DB = require("../models/chat_message");
const mapName = require("../util/mapName");
const checkExist = require("../util/checkExist");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  try {
    for (const queryField of Object.keys(req.query)) {
      const dbField = mapName(queryField);
      await checkExist(dbField, req.query[queryField]);
    }
    const yesterday = await checkDateBefore(req.query.date);
    const subsToday = await Chat_DB.distinct("userName", {
      subscriber: true,
      chatDate: req.query.date,
    });

    const subsYesterday = await Chat_DB.distinct("userName", {
      subscriber: true,
      chatDate: yesterday,
    });

    const newSubs = checkDiff(subsToday, subsYesterday);
    const newSubsCount = newSubs.length;
    return res.status(200).json({ newSubsCount: newSubsCount });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

const checkDiff = (todaySubs, yesterdaySubs) => {
  let result = [];
  for (const todaySub of todaySubs) {
    if (!yesterdaySubs.includes(todaySub)) result.push(todaySub);
  }
  return result;
};

const checkDateBefore = async (today) => {
  const day = today.split("/");
  const yesterday = new Date(day[2], day[0] - 1, day[1]);
  yesterday.setDate(yesterday.getDate() - 1);
  await checkExist("chatDate", yesterday.toLocaleDateString());
  return yesterday.toLocaleDateString();
};
