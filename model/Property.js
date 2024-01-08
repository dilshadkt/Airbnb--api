const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  hostid: {
    type: String,
    // required: true,
  },
  propertyType: {
    type: String,
    // required: true,
  },
  houseType: {
    type: String,
    // required: true,
  },
  place: {
    type: Object,
  },
  aboutPlace: {
    type: Object,
  },
  propertyOffer: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  pricePeNight: {
    type: Number,
    // required: true,
  },
  availability: {
    type: Array,
    // required: true,
  },
  images: {
    type: Object,
  },
  maxGuest: {
    type: Number,
    // required: true,
  },
  bedrooms: {
    type: Number,
    // required: true,
  },
  bathrooms: {
    type: Number,
    // required: true,
  },
  isVefied: {
    type: Boolean,
  },

  discount: {
    type: Number,
  },
  security: {
    type: Array,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
