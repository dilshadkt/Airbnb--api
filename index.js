const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const userRout = require("./routers/users");
const ListRout = require("./routers/List");
const AddWishList = require("./routers/Wishlist");
const BookRout = require("./routers/bookRout");
const adminRout = require("./routers/admin");
const paymentRout = require("./routers/payment");
const graphRouter = require("./routers/graphRoute");
const error = require("./middlewares/ErrorHandle");
const { cloudinaryConfig } = require("./config/Couldinary");

/////////// connecting to mongodb //////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connetion is good"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "https://airbnb-api-7y1p.onrender.com",
  })
);
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.use("/listings", ListRout);
app.use("/user", userRout);
app.use("/addWishList", AddWishList);
app.use("/book", BookRout);
app.use("/admin", userRout);
app.use("/admine/property", adminRout);
app.use("/payment", paymentRout);
app.use("/data", graphRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("listning on port " + process.env.PORT);
});
