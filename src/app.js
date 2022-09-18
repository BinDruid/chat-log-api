const express = require("express");
const routers = require("./routes/setup");
const logRequestInfo = require("./middlewares/log_request_info");
const errorLogger = require("./middlewares/error_logger");
const notFound = require("./middlewares/not_found");
const initialize = require("../config/setup/init");

const app = express();
initialize(app);

app.use(logRequestInfo);

routers(app);

app.use(errorLogger);
app.use(notFound);

module.exports = app;
