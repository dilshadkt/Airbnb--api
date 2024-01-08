const router = require("express").Router();
const {
  postReserve,
  GetAllReserve,
  GetTrip,
  DeleteTrips,
} = require("../controllers/BookControler");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");

router.post("/stay/:userId", asyncMiddleware(postReserve));
router.get("/stay/:userId", asyncMiddleware(GetAllReserve));
router.get("/trip/:userId", asyncMiddleware(GetTrip));
router.delete("/trip/:tripId", DeleteTrips);

module.exports = router;
