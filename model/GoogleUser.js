const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

exports.GoogleUser = GoogleUser;
