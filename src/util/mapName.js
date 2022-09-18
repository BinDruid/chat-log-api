const UserError = require("./errorTypes");

module.exports = (queryFilter) => {
  switch (queryFilter) {
    case "date":
      return "chatDate";
    case "user":
      return "userName";
    default:
      throw new UserError(
        `Query filter < ${queryFilter} > is not a valid filter.`
      );
  }
};
