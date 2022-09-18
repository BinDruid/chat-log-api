const logger = require("../../config/setup/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);
};
