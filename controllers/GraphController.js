const Property = require("../model/Property");
const Reservation = require("../model/Reservation");
const { User } = require("../model/User");
const { WhishList } = require("../model/Whishlist");

const getDatas = async (req, res) => {
  const TotalUsers = (await User.find()).length;
  const TotalHost = (await User.find({ userType: "host" })).length;

  const TotalReservation = (await Reservation.find()).length;
  const averageReservation = TotalReservation / 2;

  const TotalWhishlist = (await WhishList.find()).length;
  const averageWhishlist = TotalWhishlist / 2;

  const TotalProperty = (await Property.find()).length;
  const pendingProperty = (await Property.find({ isVefied: false })).length;

  const acceptedProperty = TotalProperty - pendingProperty;

  const data = [
    {
      name: "Users",
      uv: TotalUsers,
      pv: TotalHost * 100,
      amt: TotalHost * 100,
    },
    {
      name: "Booking",
      uv: TotalReservation * 100,
      pv: averageReservation * 100,
      amt: TotalReservation * 60,
    },
    {
      name: "Property",
      uv: TotalProperty * 10,
      pv: pendingProperty * 10,
      amt: acceptedProperty * 20,
    },
    {
      name: "WhishList",
      uv: TotalWhishlist * 100,
      pv: averageWhishlist * 100,
      amt: TotalWhishlist * 100,
    },
  ];
  res.status(200).send(data);
};
module.exports = { getDatas };
