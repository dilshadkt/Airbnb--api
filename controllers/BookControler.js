const Property = require("../model/Property");
const Reserve = require("../model/Reservation");
const _ = require("lodash");
const { User } = require("../model/User");

//////// RESERVE  🧾🧾🧾 ///////////////
const postReserve = async (req, res) => {
  const reservation = new Reserve(
    _.pick(req.body, [
      "guestId",
      "listingId",
      "checkInDate",
      "checkoutDate",
      "totalPrice",
      "bookingDate",
    ])
  );

  const property = await Property.findById(req.body.listingId);
  property.availability.push({
    guestId: reservation.guestId,
    checkIn: reservation.checkInDate,
    checkOut: reservation.checkoutDate,
  });

  const host = await User.findById(property.hostid);
  host.reservation.push(reservation._id);
  await host.save();
  await reservation.save();
  await property.save();

  res.status(200).json("resrved succesfully");
};

/////// GET ALLL RESERVATION ///////////////
const GetAllReserve = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate({
      path: "reservation",
      populate: { path: "listingId" },
    })
    .select({ reservation: 1 });
  if (user.reservation.length === 0) return res.status(200).send([]);
  res.send(user.reservation);
};

///// GET ALL TRIPS ////////
const GetTrip = async (req, res) => {
  const userId = req.user._id;
  const trips = await Reserve.find({ guestId: userId }).populate("listingId");
  res.send(trips);
};

//// DELETE TRIPS ///////////
const DeleteTrips = async (req, res) => {
  const trips = await Reserve.findByIdAndDelete(req.params.tripId);
  res.send(trips);
};

module.exports = { postReserve, GetAllReserve, GetTrip, DeleteTrips };
