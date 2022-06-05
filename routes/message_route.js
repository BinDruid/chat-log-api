const express = require("express");
const router = express.Router();
const all_message_info = require("../controllers/all_message_info.js");

router.get("/", all_message_info);

module.exports = router;
