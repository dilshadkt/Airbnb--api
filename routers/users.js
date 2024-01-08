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

router.post("/login", asyncMiddleware(Login));
router.post("/signin", asyncMiddleware(Sign));
router.post("/googleAuth", asyncMiddleware(googleSign));
router.post("/me", auth, asyncMiddleware(CurrentUser));
router.get("/allUser", asyncMiddleware(GetAllUser));
router.patch("/:userId", upload.single("photos"), asyncMiddleware(UpdateUser));

module.exports = router;
