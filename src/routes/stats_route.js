const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);
router.get("/", controllers.get_stats);

module.exports = router;
