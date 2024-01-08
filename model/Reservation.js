const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },

  checkoutDate: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },

  guestMessage: {
    type: String,
    // required: true,
  },
  bookingDate: {
    type: String,
  },
});

module.exports = mongoose.model("Reservation", reserveSchema);
