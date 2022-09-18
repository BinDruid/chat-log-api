const home_route = require("./home_route.js");
const stats_route = require("./stats_route.js");
const messages_route = require("./messages_route.js");
const test_route = require("./test_route.js");
const user_route = require("./user_route.js");
const top_words_route = require("./top_words_route.js");

module.exports = (app) => {
  app.use("/", home_route);
  app.use("/api/v1/user", user_route);
  app.use("/api/v1/stats", stats_route);
  app.use("/api/v1/messages", messages_route);
  app.use("/api/v1/topwords", top_words_route);
  app.use("/api/v1/test", test_route);
};
