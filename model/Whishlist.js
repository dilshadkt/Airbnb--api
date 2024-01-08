const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const whishListSchema = new mongoose.Schema({
  property: {
    type: Array,
    ref: "Property",
  },
  user: {
    type: String,
  },
});

const WhishList = mongoose.model("WhishList", whishListSchema);

exports.WhishList = WhishList;
