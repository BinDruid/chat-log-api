module.exports = (app) => {
  require("./database")();
  require("./security")(app);
};
