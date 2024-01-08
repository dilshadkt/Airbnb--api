require("dotenv").config();
const express = require("express");
const RazorPay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const option = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await instance.orders.create(option);
    if (!order) return res.status(500).send("some error occured");
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/success", async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "Xw9IqT3PWVBCmulWv8elPeGr");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
