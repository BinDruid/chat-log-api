const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
router.get("/", controllers.get_stats);

module.exports = router;
