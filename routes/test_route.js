const express = require("express");
const router = express.Router();
const get_test_1 = require("../controllers/get_test_1.js");
const get_test_2 = require("../controllers/get_test_2.js");

router.get("/test1", get_test_1);
router.get("/test2", get_test_2);

module.exports = router;
