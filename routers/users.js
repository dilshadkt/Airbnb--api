const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  Login,
  Sign,
  CurrentUser,
  GetAllUser,
  UpdateUser,
  googleSign,
} = require("../controllers/UserController");
const auth = require("../middlewares/VerifyToken");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const VerifyToken = require("../middlewares/VerifyToken");

router.post("/login", asyncMiddleware(Login));
router.post("/signin", asyncMiddleware(Sign));
router.post("/googleAuth", asyncMiddleware(googleSign));
router.post("/me", auth, asyncMiddleware(CurrentUser));
router.get("/allUser", VerifyToken, asyncMiddleware(GetAllUser));
router.patch(
  "/",
  VerifyToken,
  upload.single("photos"),
  asyncMiddleware(UpdateUser)
);

module.exports = router;
