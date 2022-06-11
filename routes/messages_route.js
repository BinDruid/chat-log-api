const express = require("express");
const router = express.Router();
const get_messages = require("../controllers/get_messages.js");

router.get("/", get_messages);

module.exports = router;
