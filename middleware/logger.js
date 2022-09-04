module.exports = (req, res, next) => {
  res.on("finish", () => {
    const logger = {
      Time: new Date().toLocaleTimeString(),
      User: req.client ?? "anonymous",
      Method: req.method,
      URL: req.baseUrl + req.url,
      Referer: req.headers.referer ?? "none",
      StatusCode: res.statusCode,
    };
    console.log(logger);
  });
  next();
};
