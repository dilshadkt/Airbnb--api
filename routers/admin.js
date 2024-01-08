const router = require("express").Router();
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const {
  getNewProperty,
  AcceptProperty,
} = require("../controllers/ListController");

router.get("/newProperty", asyncMiddleware(getNewProperty));
router.patch("/newProperty/:propertyId", asyncMiddleware(AcceptProperty));

module.exports = router;
