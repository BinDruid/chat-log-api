const express = require("express");
const router = express.Router();
const get_test = require("../controllers/get_test.js");
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);
router.get("/", get_test);

module.exports = router;
