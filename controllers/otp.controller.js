const twilio = require("twilio");

const accoutnSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accoutnSid, authToken);
const sendOtp = (req, res) => {
  const { phoneNumber } = req.body;
  client.verify
    .services("VA58a282530f2c5db534d1b65b98123b71")
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => res.json({ sid: verification.sid }))
    .catch((error) => res.status(500).json({ error: error.message }));
};
const verifyOtp = (req, res) => {
  const { phoneNumber, code } = req.body;
  client.verify
    .services("VA58a282530f2c5db534d1b65b98123b71")
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
module.exports = { sendOtp, verifyOtp };
