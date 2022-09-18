const Chat_DB = require("../models/chat_message");
const mapName = require("./mapName");
const checkExist = require("./checkExist");
const getTopWords = require("./getTopWords");
const UserError = require("./errorTypes");

module.exports = class QueryHandler {
  constructor(queryString, url) {
    this.requestUrl = url;
    this.userQuery = { ...queryString };
    this.page = queryString.page ?? 1;
    this.limit = 20;
    this.skip = (this.page - 1) * this.limit;
    this.dbQuery = {};
    this.pagination = {};
    this.queryResult = {};
  }

  empty() {
    // return !!Object.keys(this.userQuery).length;
    for (let queryField in this.userQuery) return false;
    return true;
  }

  async checkValid(allowedParams, generalQuery = flase) {
    if (Object.keys(this.userQuery).length == 0 && generalQuery) return true;
    for (const queryField in this.userQuery) {
      if (queryField == "page") continue;
      if (!allowedParams.includes(queryField))
        throw new UserError(
          `Query parameter < ${queryField} > is not valid parameter for this request.`
        );
      const dbField = mapName(queryField);
      await checkExist(dbField, this.userQuery[queryField]);
      this.dbQuery[dbField] = this.userQuery[queryField];
    }
    return true;
  }

  async fetchStats() {
    const userCounts = (await Chat_DB.distinct("userID", this.dbQuery)).length;
    this.dbQuery["subscriber"] = true;
    const subCounts = (await Chat_DB.distinct("userID", this.dbQuery)).length;
    this.queryResult.result = {
      uniqueUsers: userCounts,
      uniqueSubs: subCounts,
    };
  }

  async fetchMessages() {
    const slelectFields = "userName message -_id";
    await this.paginate();
    const messages = await Chat_DB.find(this.dbQuery)
      .select(slelectFields)
      .limit(this.limit)
      .skip(this.skip);
    this.queryResult.result = {
      messages: messages,
      page: this.pagination,
    };
  }

  async fetchTopWords() {
    const messages = await Chat_DB.find(this.dbQuery);
    const occurrence = 10;
    const topWords = getTopWords(messages, occurrence);
    if (!Object.keys(topWords).length)
      throw new UserError(
        `All of the words have occurrence lower than ${occurrence} times.`
      );
    this.queryResult.result = {
      topWords: topWords,
    };
  }

  getResult() {
    return this.queryResult;
  }

  formQuery(queryObj) {
    let query = "";
    for (const queryField in queryObj)
      query += `&${queryField}=${queryObj[queryField]}`;
    return query;
  }
  async paginate() {
    const nextQuery = { ...this.userQuery };
    const pervQuery = { ...this.userQuery };
    const firstDocument = (this.page - 1) * this.limit;
    const lastDocument = this.page * this.limit;
    const documentCount = await Chat_DB.countDocuments(this.dbQuery);
    const baseUrl = "https://twitch.abharya.ir";
    if (lastDocument < documentCount) {
      nextQuery.page = parseInt(this.page) + 1;
      this.pagination.next = `${baseUrl}${this.requestUrl}?${this.formQuery(
        nextQuery
      )}`;
    }
    if (firstDocument > 0) {
      pervQuery.page = parseInt(this.page) - 1;
      this.pagination.perv = `${baseUrl}${this.requestUrl}?${this.formQuery(
        pervQuery
      )}`;
    }
  }
};
