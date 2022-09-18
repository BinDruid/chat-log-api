require("dotenv").config();
const config = require("config");
const env = config.get("env");
module.exports = {
  env,
  secret: config.get("secret"),
  port: config.get("port"),
  mongo: {
    url: config.get("mongo") + (env === "test" ? "_test" : ""),
    options: { useNewUrlParser: true },
  },
};
