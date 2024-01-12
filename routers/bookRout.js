const router = require("express").Router();
const {
  postReserve,
  GetAllReserve,
  GetTrip,
  DeleteTrips,
} = require("../controllers/BookControler");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const VerifyToken = require("../middlewares/VerifyToken");
router.post("/stay", VerifyToken, asyncMiddleware(postReserve));
router.get("/stay", VerifyToken, asyncMiddleware(GetAllReserve));
router.get("/trip", VerifyToken, asyncMiddleware(GetTrip));
router.delete("/trip/:tripId", VerifyToken, DeleteTrips);

module.exports = router;
