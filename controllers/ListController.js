const Property = require("../model/Property");
const _ = require("lodash");
const { uploader } = require("../config/Couldinary");
const { User } = require("../model/User");
const { any } = require("joi");

//////// get all list of property /////////
const geAlltList = async (req, res) => {
  let properties = req.query.id
    ? await Property.findById(req.query.id)
    : await Property.find({ isVefied: true });

  if (req.query.id) {
    const user = await User.findOne({ _id: properties.hostid });
    res
      .status(200)
      .json({
        ...properties._doc,
        hostName: user.firstName,
        profile: user.profilePicture,
      });
  } else res.status(200).json(properties);
};

//// GET ALL LIST OF USER //////////////////////
const getAllListUser = async (req, res) => {
  const userId = req.user._id;
  const property = await Property.find({ hostid: userId });
  res.send(property);
};

///////// POST A LIST (PROPERTY) ☆*: .｡. o(≧▽≦)o .｡.:*☆ ////////
const postList = async (req, res) => {
  let Files = req.files;

  if (!Files) return res.status(400).json({ message: "No picture attached!" });

  let multiplePicturePromise = Files.map((picture) =>
    uploader.upload(picture.path)
  );
  // await all the cloudinary upload functions in promise.all, exactly where the magic happens
  let imageResponses = await Promise.all(multiplePicturePromise);

  const property = new Property(
    _.pick(JSON.parse(req.body.property), [
      "houseType",
      "propertyType",
      "place",
      "aboutPlace",
      "propertyOffer",
      "image",
      "title",
      "description",
      "pricePeNight",
      "discount",
      "security",
    ])
  );
  property.hostid = req.user._id;
  property.isVefied = false;
  property.images = imageResponses.map((item) => item.url);

  const user = await User.findById(req.user._id);

  user.userType = "host";
  await user.save();
  const NewProperty = await property.save();
  res.status(200).json(NewProperty);
};

///  GET NEW PROPERTY THAT'S NOT VERIFIED （づ￣3￣）づ╭❤️～ //////

const getNewProperty = async (req, res) => {
  const property = await Property.find({ isVefied: false });
  if (!property) return res.status(400).send("no new property ");
  res.send(property);
};

/// UPDATE PROPERTY  TO VERIFIED PROPERTY ////////
const AcceptProperty = async (req, res) => {
  const property = await Property.findById(req.params.propertyId);
  property.isVefied = true;
  await property.save();
  res.status(200).send(" is verified by admin");
};

/// DELETE A LIST  ✖️✖️✖️ /////////

const DeletList = async (req, res) => {
  await Property.findByIdAndDelete(req.params.propertyId);
  const property = await Property.find({ hostid: req.query.userId });
  if (property) return res.send(property);
  else return res.send("successfully removed");
};

///// UPDATE A LIST /////////////

const UpdateList = async (req, res) => {
  let file = req.files;
  const property = await Property.findById(req.params.propertyId);
  const objkey = Object.keys(req.body).toString();
  const value = Object.values(req.body).toString();
  if (file) {
    let multiplePicturePromise = file.map((pic) => uploader.upload(pic.path));
    let imageResponses = await Promise.all(multiplePicturePromise);
    const images = imageResponses.map((item) => item.url);
    property.images = images;
    await property.save();
    res.send(property);
  } else {
    property[objkey] = value;
    await property.save();

    res.send(property);
  }
};

//// FILTERED LIST //////////////////////
const filteredList = async (req, res) => {
  const list = await Property.find({
    propertyType: req.query.type,
    isVefied: true,
  });
  if (list.length === 0) return res.status(203).send(false);
  res.send(list);
};

////////// CUSTOME FILTERD ////////////////
const customeFilter = async (req, res) => {
  const query = [
    {
      isVefied: true,
    },
  ];
  if (req.query.type) {
    if (req.query.type === "Any Type") query;
    else query.push({ houseType: req.query.type });
  }
  if (req.query.minRange) {
    query.push({ pricePeNight: { $gt: Number(req.query.minRange) } });
  }
  if (req.query.bedroom) {
    if (req.query.bedroom === "any") query;
    else if (req.query.bedroom === "8+")
      query.push({ bedrooms: { $gt: Number(req.query.bedroom) } });
    else query.push({ bedrooms: req.query.bedroom });
  }
  if (req.query.bathroom) {
    if (req.query.bathroom === "any") query;
    else if (req.query.bathroom == "8")
      query.push({ bathrooms: { $gt: Number(req.query.bathroom) } });
    else query.push({ bathrooms: req.query.bathroom });
  }

  const list = await Property.find({ $and: query });
  if (list.length === 0) return res.send(false);
  res.send(list);
};

/////////////  GET OWNER DETAILS ///////////////
const getOwnerDetails = async (req, res) => {
  const propertyId = req.params.propertyId;
  const poperty = await Property.findById(propertyId);
  const ownerId = poperty.hostid;
  const owner = await User.findById(ownerId);
  if (!owner) return res.status(403).send("there is no owner with this id");
  res.status(200).send(_.pick(owner, ["firstName", "email", "phone"]));
};
module.exports = {
  geAlltList,
  postList,
  getNewProperty,
  AcceptProperty,
  getAllListUser,
  DeletList,
  UpdateList,
  filteredList,
  customeFilter,
  getOwnerDetails,
};
