const express = require("express");
const router = express.Router();
const client_token = require("../controllers/post_client_token");
router.post("/", client_token);

module.exports = router;
