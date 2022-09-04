const express = require("express");
const router = express.Router();
const view_home = require("../controllers/view_home");
router.get("/", view_home);

module.exports = router;
