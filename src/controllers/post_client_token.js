const User_DB = require("../models/user");
const bcrypt = require("bcrypt");
const UserError = require("../util/errorTypes");
const jwt = require("jsonwebtoken");
const configs = require("../../config/configuratios");

module.exports = async (req, res) => {
  const { username, password } = req.headers;
  try {
    const user = await User_DB.findOne({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(user.id, configs.secret);
      return res.status(200).json({ accessToken: accessToken });
    }
    throw new UserError(`Invalid user information`);
  } catch (error) {
    if (error instanceof UserError)
      res.status(400).json({ [error.name]: error.message });
    else res.status(500).json({ [error.name]: error.message });
  }
};
