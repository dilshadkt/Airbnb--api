const router = require("express").Router();
const {
  generateOtpSend,
  verifyOtp,
  changePassword,
} = require("../controllers/otpController");
const asyncMiddleWare = require("../middlewares/AsyncMiddleware");
router.post("/request-otp", asyncMiddleWare(generateOtpSend));
router.post("/verify", asyncMiddleWare(verifyOtp));
router.post("/validate", asyncMiddleWare(changePassword));
module.exports = router;
