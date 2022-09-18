const app = require("./src/app");
const configs = require("./config/configuratios");
const logger = require("./config/setup/logger");
const mongoose = require("mongoose");

const port = configs.port;

const server = app.listen(port, () => {
  logger.info(`Server is listening on ${port}`);
});

const exitHandler = () => {
  if (server)
    server.close(() => {
      mongoose.disconnect();
      mongoose.connection.close();
      logger.info("Server closed");
    });
  process.exit(1);
};

const unexpectedErrorHandler = (error) => {
  logger.error(error.message, error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

module.exports = server;
