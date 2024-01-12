const express = require("express");
const VerifyToken = require("../middlewares/VerifyToken");
const router = express.Router();
const {
  setOrder,
  successPayment,
} = require("../controllers/PaymentController");
const asyncMiddleWare = require("../middlewares/AsyncMiddleware");

router.post("/orders", VerifyToken, asyncMiddleWare(setOrder));
router.post("/success", VerifyToken, asyncMiddleWare(successPayment));

module.exports = router;
