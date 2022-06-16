const express = require("express");
const router = express.Router();
const register_user = require("../controllers/post_user");
const client_token = require("../controllers/post_client_token");
router.post("/", register_user);
router.post("/token", client_token);

module.exports = router;
