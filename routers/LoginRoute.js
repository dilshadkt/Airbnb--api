const router = require("express").Router();
const { handleLogin } = require("../controllers/auth.controller.js");

router.post("/login", handleLogin);

module.exports = router;
