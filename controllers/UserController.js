const { User, validate } = require("../model/User");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { WhishList } = require("../model/Whishlist");
const { uploader } = require("../config/Couldinary");

//////////////  LOGIN (❁´◡`❁) ///////////////

const Login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bycrypt.genSalt(10);
  const user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );

  user.password = await bycrypt.hash(user.password.toString(), salt);
  const newUser = await user.save();
  const token = user.generateAuthToken();
  res.header("X-auth-token", token).json({ user: newUser, token });
};

///////////// SIGN (✿◡‿◡) ////////////////

const Sign = async (req, res) => {
  const { userName, password } = req.body;

  const { error } = validateUser(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: userName });

  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bycrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();
  const whish = await WhishList.findOne({ user: user._id }).populate(
    "property"
  );
  const propertyId = whish
    ? whish.property.map((item) => item._id.toString())
    : [];

  res.status(200).send({ token, user, propertyId });
};

/////////////   GOOGLE SIGN   🚀🚀🚀🚀///////////////

const googleSign = async (req, res) => {
  const { given_name, picture, email } = req.body.data;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("there is no user with this email");
  const token = user.generateAuthToken();
  const whish = await WhishList.findOne({ user: user._id }).populate(
    "property"
  );
  const propertyId = whish
    ? whish.property.map((item) => item._id.toString())
    : [];
  res.status(200).send({ token, user, propertyId });
};

//////////// CURRENT USER .·´¯`(>▂<)´¯`·.   ///////////

const CurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
};

/////////////// DETAILS OF ALL USER /////////
const GetAllUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

////// UPDATE USER 👨‍🔧👨‍🔧👨‍🔧 //////
const UpdateUser = async (req, res) => {
  const userId = req.user._id;
  if (req.file) {
    const file = req.file;
    if (!file)
      return res.status(400).json({ message: "no picture is provide" });
    const image = await uploader.upload(file.path);
    const user = await User.findById(userId);
    if (!user) return res.status(400).send("no user found");
    user.profilePicture = image.url;
    await user.save();
    res.status(200).send(image.url);
  } else {
    const user = await User.findById(userId);
    user[Object.keys(req.body)] = Number(Object.values(req.body).toString());
    await user.save();
    res.send(user);
  }
};
///////// joi validation  /////////////

function validateUser(user) {
  const Schema = Joi.object({
    userName: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(100),
  });
  return Schema.validate(user);
}

module.exports = {
  Login,
  Sign,
  CurrentUser,
  GetAllUser,
  UpdateUser,
  googleSign,
};
