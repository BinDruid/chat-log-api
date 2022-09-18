const winston = require("winston");
const { env } = require("../configuratios.js");
const { format } = require("logform");
const { combine, timestamp, prettyPrint } = format;

module.exports = winston.createLogger({
  level: env === "development" ? "debug" : "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
      level: "info",
    }),
    new winston.transports.Console(),
  ],
});
