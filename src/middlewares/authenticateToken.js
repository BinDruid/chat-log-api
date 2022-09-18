const jwt = require("jsonwebtoken");
const configs = require("../../config/configuratios");

module.exports = (req, res, next) => {
  const authHeader = req.headers["auth-token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401);
  try {
    const user = jwt.verify(token, configs.secret);
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).json({ errorMessage: e.message });
  }
};
