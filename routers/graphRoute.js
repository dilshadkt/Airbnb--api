const router = require("express").Router();
const { getDatas } = require("../controllers/GraphController");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
router.get("/", asyncMiddleware(getDatas));
module.exports = router;
