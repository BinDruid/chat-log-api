const express = require("express");
const router = express.Router();
const top_words = require("../controllers/get_top_words");
const authenticateToken = require("../middleware/authenticateToken");

router.use(authenticateToken);
router.get("/", top_words);

module.exports = router;
