const express = require("express");
const router = express.Router();
const get_test = require("../controllers/get_test.js");

router.get("/", get_test);

module.exports = router;
