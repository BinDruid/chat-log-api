const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
router.get("/", controllers.all_chatter_info);
router.get("/:name", controllers.chatter_info);

module.exports = router;
