const express = require("express");
const router = express.Router();
const all_chatter_info = require("../controllers/all_chatter_info.js");
const chatter_info = require("../controllers/chatter_info.js");

router.get("/", all_chatter_info);
router.get("/:name", chatter_info);

module.exports = router;
