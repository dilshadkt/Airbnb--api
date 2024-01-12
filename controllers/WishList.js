const { User } = require("../model/User");
const { WhishList } = require("../model/Whishlist");

/////////ADD WHISH LIST  (✿◡‿◡) ////////////////////
const addwhishList = async (req, res, next) => {
  let user = await User.findById(req.user);
  const IsExist = await WhishList.findOne({ user: user._id });

  if (IsExist) {
    IsExist.property.push(req.query.propertyId);
    await IsExist.save();

    res.status(201).send(IsExist.property);
  } else {
    const newWish = new WhishList({
      user: user._id,
      property: [req.query.propertyId],
    });
    user.whishList = newWish._id;
    await user.save();
    await newWish.save();
    res.send(newWish.property);
  }
};

//////////// GET WHISH LIST  ///////////////////
const GetWhishList = async (req, res) => {
  const whish = await WhishList.findOne({ user: req.user._id }).populate(
    "property"
  );
  let user = await User.findById(req.params.userId)
    .populate("whishList")
    .select({ whishList: 1 });
  await user.whishList.populate("property");
  user = user.whishList.property.map((item) => ({
    propertyId: item._id,
    images: item.images,
  }));

  if (user.length === 0) return res.status(200).send(false);

  res.send(user);
};

///// DELETE WISHLIST  ////////////////////
const DeleteWhishList = async (req, res) => {
  const userId = req.user._id;
  let whislist = await WhishList.findOne({ user: userId });
  const result = whislist.property.filter(
    (item) => item.toString() !== req.query.propertyId
  );

  whislist.property = result;
  await whislist.populate("property");
  await whislist.save();
  whislist = whislist.property.map((item) => ({
    propertyId: item._id,
    images: item.images,
  }));

  res.send(whislist);
};
/////// GET ALL WISH LIST ////////////////////
const GetAllWishlist = async (req, res) => {
  const whishlist = await WhishList.find()
    .populate("property")
    .select({ property: 1 });
  const result = whishlist.map((item) => item.property);
  res.status(200).send(result.flat());
};
module.exports = {
  addwhishList,
  GetWhishList,
  DeleteWhishList,
  GetAllWishlist,
};
