const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["auth-token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401);
  try {
    const client = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.client = client;
    next();
  } catch (e) {
    return res.status(403).json({ errorMessage: e.message });
  }
};
