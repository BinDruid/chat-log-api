const mongoose = require("mongoose");
const configs = require("../configuratios");
const logger = require("./logger");

const connectDB = () => {
  mongoose.connect(configs.mongo.url, configs.mongo.options).then(() => {
    logger.info("Connected to database.");
  });
};

module.exports = connectDB;
