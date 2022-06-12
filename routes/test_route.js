const express = require("express");
const router = express.Router();
const get_test = require("../controllers/get_test.js");
const authenticateToken = require("../middleware/authenticateToken");
router.get("/", authenticateToken, get_test);

module.exports = router;
