const router = require("express").Router();
const {
  addwhishList,
  GetWhishList,
  DeleteWhishList,
  GetAllWishlist,
} = require("../controllers/WishList");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const verifyToken = require("../middlewares/VerifyToken");

router.post("/", verifyToken, asyncMiddleware(addwhishList));
router.get("/:userId", verifyToken, asyncMiddleware(GetWhishList));
router.get("/all", verifyToken, asyncMiddleware(GetAllWishlist));
router.delete("/", verifyToken, asyncMiddleware(DeleteWhishList));

module.exports = router;
