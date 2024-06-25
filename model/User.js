const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.socialType !== "google";
    },
    minlength: 5,
  },
  profilePicture: {
    type: String,
  },
  phone: {
    type: Number,
  },
  userType: {
    type: String,
    enum: ["user", "host", "admin"],
  },
  whishList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WhishList",
  },
  reservation: {
    type: Array,
    ref: "Reservation",
    required: function () {
      return this.userType == "host";
    },
  },
  socialType: {
    type: String,
    enum: ["google", ""], // Added an empty string for traditional signups
  },
  googleUser: {
    type: mongoose.Schema.ObjectId,
    ref: "GoogleUser",
  },
});

// JWT Token generation method
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, userType: this.userType },
    process.env.JWT_KEY
  );
  return token;
};

// User Model
const User = mongoose.model("User", userSchema);

// Joi validation for user input

function validateUser(user) {
  const Schema = Joi.object({
    firstName: Joi.string().required().max(100),
    lastName: Joi.string().required().min(2).max(10),
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().when("socialType", {
      is: Joi.exist().valid(""),
      then: Joi.string().required().min(5).max(12),
      otherwise: Joi.forbidden(),
    }),
    socialType: Joi.string().valid("", "google"),
  });
  return Schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
