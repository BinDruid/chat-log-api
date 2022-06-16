const express = require("express");
const router = express.Router();
const get_messages = require("../controllers/get_messages.js");
const authenticateToken = require("../middleware/authenticateToken");

router.use(authenticateToken);
router.get("/", get_messages);

module.exports = router;
