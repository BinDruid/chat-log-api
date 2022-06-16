const User_DB = require("../models/user");
const UserError = require("../util/errorTypes");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.headers;
    const newUser = await User_DB.create({
      username: username,
      password: password,
    });
    return res.status(201).json({ newUser: newUser.username });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
