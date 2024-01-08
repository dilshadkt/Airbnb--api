const router = require("express").Router();
const {
  addwhishList,
  GetWhishList,
  DeleteWhishList,
  GetAllWishlist,
} = require("../controllers/WishList");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");

router.post("/:userId", asyncMiddleware(addwhishList));
router.get("/:userId", asyncMiddleware(GetWhishList));
router.get("/", asyncMiddleware(GetAllWishlist));
router.delete("/:userId", asyncMiddleware(DeleteWhishList));

module.exports = router;
