const logger = require("../../config/setup/logger");

module.exports = (req, res, next) => {
  res.on("finish", () => {
    const requestInfo = {
      Time: new Date().toLocaleTimeString(),
      User: req.user ?? "anonymous",
      Method: req.method,
      URL: req.headers.host + req.baseUrl + req.url,
      Referer: req.headers.referer ?? "none",
      StatusCode: res.statusCode,
    };
    logger.info(requestInfo);
  });
  next();
};
