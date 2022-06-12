const jwt = require("jsonwebtoken");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  try {
    const client_id = req.headers["client_id"];
    const accessToken = jwt.sign(client_id, process.env.ACCESS_TOKEN);
    return res.status(200).json({ accessToken: accessToken });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};
