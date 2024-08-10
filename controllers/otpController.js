const nodemailer = require("nodemailer");
const { User } = require("../model/User");
const bycrypt = require("bcrypt");

const otpStore = {};

const generatOtp = () => Math.floor(100000 + Math.random() * 900000);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.APP_PASSWORD,
  },
});

// // Send OTP via email
const sendOTP = (userEmail, otp) => {
  const mailOptions = {
    from: "hmydilshadkt@gmail.com",
    to: userEmail,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://airbnb-clone-six-rust.vercel.app/assets/logo.png" alt="Your Company Logo" style="height: 50px; width: auto;">
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #FF5A5F; text-align: center;">Team Airbnb</h2>
          <h3 style="color: #4CAF50;">Password Reset OTP</h3>
          <p>Your OTP for password reset is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #ff5733;">${otp}</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `,
    // text: `Your OTP for password reset is: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const generateOtpSend = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = generatOtp();
  otpStore[username] = otp;
  sendOTP(username, otp);
  return res.json({ success: true });
};

///////// verify otp //////////
const verifyOtp = async (req, res) => {
  const { otp, username } = req.body;
  if (!otp) return res.status(400).json({ error: "otp is required" });
  console.log(otpStore[username]);

  if (Number(otpStore[username]) === Number(otp)) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "invalid otp" });
  }
};
//////// change password /////////////
const changePassword = async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ email: username });
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(password.toString(), salt);
  await user.updateOne({ password: hashPassword });
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "successfully changed password" });
};

module.exports = { generateOtpSend, verifyOtp, changePassword };
