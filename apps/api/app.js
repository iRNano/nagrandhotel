require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//Models
const Users = require("./models/User.js");
const Rooms = require("./models/Room");
const Categories = require("./models/Category");
const Bookings = require("./models/Booking");
const Tokens = require("./models/Token");

// connect to database
const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/booking-system";
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.once("open", () => console.log("We are connected to MongoDB"));

const corsOrigin = process.env.CORS_ORIGIN || "*";
const corsOptions =
  corsOrigin === "*"
    ? { origin: "*" }
    : {
        origin: corsOrigin
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//routes

app.use("/users", require("./crud")(Users));
app.use("/auth", require("./crud")(Users));
app.use("/rooms", require("./crud")(Rooms));
app.use("/categories", require("./crud")(Categories));
app.use("/book", require("./crud")(Bookings));
app.use("/token", require("./crud")(Tokens));
app.use("/transactions", require("./crud")(Bookings));

//check the invalid field on the error
app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});
//listen to database
app.listen(PORT, console.log("Listening to port " + PORT));
