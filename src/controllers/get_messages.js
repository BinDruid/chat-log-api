const UserError = require("../util/errorTypes");
const QueryHandler = require("../util/QueryHandler");

module.exports = async (req, res) => {
  const query = new QueryHandler(req.query, req.baseUrl);
  try {
    await query.checkValid(["date", "user"], (general = true));
    await query.fetchMessages();
    return res.status(200).json(query.getResult());
  } catch (error) {
    if (error instanceof UserError)
      res.status(400).json({ [error.name]: error.message });
    else res.status(500).json({ [error.name]: error.message });
  }
};
