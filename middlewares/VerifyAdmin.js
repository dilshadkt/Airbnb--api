module.exports = function (req, res, next) {
  if (req.user.userType !== "admin")
    return res.status(403).send("Acess denied");
  next();
};
