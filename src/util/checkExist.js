const Chat_DB = require("../models/chat_message");
const UserError = require("./errorTypes");

module.exports = async (fieldName, fieldValue) => {
  const query = { [fieldName]: fieldValue };
  if (!(await Chat_DB.exists(query))) {
    throw new UserError(`${fieldName}: < ${fieldValue} > does not exist.`);
  }
};
