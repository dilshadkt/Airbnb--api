const router = require("express").Router();
const { sendOtp, verifyOtp } = require("../controllers/otp.controller.js");

router.post("/send-otp", sendOtp); // SEND OTP
router.post("/verify-otp", verifyOtp); // VERIFY OTP
module.exports = router;
