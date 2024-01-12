const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const {
  geAlltList,
  postList,
  getAllListUser,
  DeletList,
  UpdateList,
  filteredList,
  customeFilter,
  getOwnerDetails,
} = require("../controllers/ListController");
const VerifyToken = require("../middlewares/VerifyToken");
const VerifyAdmin = require("../middlewares/VerifyAdmin");

router.patch(
  "/:propertyId",
  upload.array("photos", 6),
  asyncMiddleware(UpdateList)
);
router.get("/", asyncMiddleware(geAlltList));
router.post(
  "/become-a-host",
  VerifyToken,
  upload.array("photos", 6),
  asyncMiddleware(postList)
);
router.get("/data", VerifyToken, asyncMiddleware(filteredList));
router.get("/filtered", VerifyToken, asyncMiddleware(customeFilter));
router.get("/manageList", VerifyToken, asyncMiddleware(getAllListUser));
router.delete(
  "/:propertyId",
  VerifyToken,
  VerifyAdmin,
  asyncMiddleware(DeletList)
);
router.get("/user/:propertyId", VerifyToken, asyncMiddleware(getOwnerDetails));

module.exports = router;
