const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
router.get("/", controllers.get_chatters);
router.get("/:name", controllers.get_chatter);

module.exports = router;
