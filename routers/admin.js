const router = require("express").Router();
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const {
  getNewProperty,
  AcceptProperty,
} = require("../controllers/ListController");
const VerifyToken = require("../middlewares/VerifyToken");
const VerifyAdmin = require("../middlewares/VerifyAdmin");

router.get("/newProperty", VerifyToken, asyncMiddleware(getNewProperty));
router.patch(
  "/newProperty/:propertyId",
  VerifyToken,
  VerifyAdmin,
  asyncMiddleware(AcceptProperty)
);

module.exports = router;
