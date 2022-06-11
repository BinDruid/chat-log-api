const Chat_DB = require("../models/chat_message");
const mapName = require("./mapName");
const checkExist = require("./checkExist");
const getTopWords = require("./getTopWords");
const UserError = require("./errorTypes");

module.exports = class QueryHandler {
  constructor(queryString) {
    this.userQuery = queryString;
    this.dbQuery = {};
    this.queryResult = {};
  }

  empty() {
    // return !!Object.keys(this.userQuery).length;
    for (let queryField in this.userQuery) return true;
    return false;
  }

  checkValid = async (allowedParams, generalQuery = flase) => {
    if (Object.keys(this.userQuery).length == 0 && generalQuery) return true;
    for (const queryField in this.userQuery) {
      if (!allowedParams.includes(queryField))
        throw new UserError(
          `Query parameter < ${queryField} > is not valid parameter for this request.`
        );
      const dbField = mapName(queryField);
      await checkExist(dbField, this.userQuery[queryField]);
      this.dbQuery[dbField] = this.userQuery[queryField];
    }
    return true;
  };

  fetchStats = async () => {
    const userCounts = (await Chat_DB.distinct("userID", this.dbQuery)).length;
    this.dbQuery["subscriber"] = true;
    const subCounts = (await Chat_DB.distinct("userID", this.dbQuery)).length;
    this.queryResult.stats = {
      uniqueUsers: userCounts,
      uniqueSubs: subCounts,
    };
  };

  fetchMessages = async () => {
    // const slelectFields = Object.keys(this.userQuery).includes("user")
    //   ? "message -_id"
    //   : "userName message -_id";
    const slelectFields = "message -_id";
    const messages = await Chat_DB.find(this.dbQuery).select(slelectFields);
    const occurrence = 10;
    const topWords = getTopWords(messages, occurrence);
    if (!Object.keys(topWords).length)
      throw new UserError(
        `All of the words have occurrence lower than ${occurrence} times.`
      );
    this.queryResult.messages = {
      totallMessages: messages.length,
      topWords: topWords,
      messages: messages,
    };
  };

  getResult() {
    return this.queryResult;
  }
};
