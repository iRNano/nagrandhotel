const express = require("express");
require("dotenv").config();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const Auth = require("./auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./models/User");
const Booking = require("./models/Booking");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const jwtSecret = process.env.JWT_SECRET;
const stripe = stripeSecretKey ? require("stripe")(stripeSecretKey) : null;

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".jpg";
    const stableName = (crypto.randomUUID && crypto.randomUUID()) || crypto.randomBytes(16).toString("hex");
    cb(null, stableName + ext);
  },
});

let upload = multer({ storage: storage });

//nodemailer config
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = (Collection) => {
  //register
  const register = async (req, res) => {
    const newUser = req.body;
    //Username must be greater than 8 characters
    console.log(newUser.username.length);
    if (newUser.username.length < 8)
      return res.status(400).json({
        status: 400,
        message: "Username must be greater than 8 characters",
      });
    //Password must be greater than 8 characters
    if (newUser.password.length < 8)
      return res.status(400).json({
        status: 400,
        message: "Password must be greater than 8 characters",
      });
    //Password2 must be greater than 8 characters
    if (newUser.password2.length < 8)
      return res.status(400).json({
        status: 400,
        message: "Password2 must be greater than 8 characters",
      });
    //Passwords should match
    if (newUser.password2 !== newUser.password)
      return res.status(400).json({
        status: 400,
        message: "Password does not match",
      });

    try {
      const email = await Collection.findOne({ email: newUser.email });
      if (email)
        return res.status(400).json({
          status: 400,
          message:
            "The email address you have entered is already associated with another account.'",
        });
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;
      await Collection.create(newUser);
      return res.json({
        status: 200,
        message: "Registered Successfully",
      });
    } catch (err) {
      return res.json({ status: 400, message: err });
    }

    //end of User.findOne

    //For email verification
    async function sendVerificationEmail(newUser, req, res) {
      try {
        let token = newUser.generateVerificationToken();
        // Save the verification token
        token.save();
        //nodemailer
        transporter.sendMail(
          {
            to: newUser.email,
            subject: "Please verify your email",
            html: `Please click this link to confirm your email address : <a href="http://localhost:3000/token/verify/${token.token}">Link</a>`,
          },
          (err, result) => {
            if (err) return console.log(err);
            return console.log(result);
          }
        );
      } catch (error) {
        console.log("fail?");
        res.status(500).json({ message: error.message });
      }
    }
  };

  //verify email function
  const verify = async (req, res) => {
    try {
      const result = await Collection.find({ token: req.params.token });
      const [tokenInfo] = result;
      if (!tokenInfo) return res.status(400).json({ message: "Invalid token" });
      const { userId } = tokenInfo;
      const user = await User.findOne({ _id: userId });
      if (!user) return res.json({ status: 400, message: "User not found" });
      user.isVerified = true;
      await user.save();
      return res.json({
        user,
        message: "Thank you for verifying your email!",
      });
    } catch (e) {
      res.send(e);
    }
  };
  //Login
  const login = async (req, res) => {
    if (!jwtSecret) {
      return res.status(500).json({
        status: 500,
        message: "JWT_SECRET is not configured.",
      });
    }
    const email = req.body.email;
    try {
      const user = await Collection.findOne({ email });
      if (!user)
        return res.status(400).json({
          status: 400,
          message: "No user found",
        });
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(401).json({
          auth: false,
          status: 401,
          message: "Invalid Credentials",
          token: null,
        });
      }
      const userObj = user.toObject();
      delete userObj.password;
      const token = jwt.sign(userObj, jwtSecret, { expiresIn: "1h" });
      return res.status(200).json({
        auth: true,
        status: 200,
        message: "Log in Successfully!",
        details: { user: userObj, token },
        user: userObj,
        token,
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: "No user found" });
    }
  };

  //Create
  const create = async (req, res) => {
    const newEntry = req.body;

    if (req.files) {
      newEntry.images = [];
      req.files.forEach((file) => {
        newEntry.images.push({
          contentType: file.mimetype,
          path: "/images/" + file.filename,
        });
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "error during uploading" });
    }
    try {
      const created = await Collection.create(newEntry);
      res.status(200).json({ newEntry: created, status: 200, message: "Successfull" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "GG sir" });
    }
  };

  //read many
  const readMany = async (req, res) => {
    console.log(req.query);
    try {
      const result = await Collection.find({});
      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  };

  //read one
  const readOne = async (req, res) => {
    const { _id } = req.params;
    try {
      const result = await Collection.findById(_id);
      if (!result) return res.status(404).send();
      if (req.query.quantity) {
        result.quantity = result.quantity - req.query.quantity;
        await result.save();
      }
      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  };

  //Update
  const update = async (req, res) => {
    const changedEntry = { ...req.body };

    if (req.files) {
      changedEntry.images = [];
      req.files.forEach((file) => {
        changedEntry.images.push({
          contentType: file.mimetype,
          path: "/images/" + file.filename,
        });
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "error during uploading" });
    }
    try {
      const result = await Collection.findOneAndUpdate(
        { _id: req.params._id },
        changedEntry,
        { new: true }
      );
      res.status(200).json({ status: 200, message: "Update successful", result });
    } catch (err) {
      res.status(400).json({ status: 400, message: "Check your inputs" });
    }
  };

  //delete
  const remove = async (req, res) => {
    try {
      await Collection.findOneAndDelete({ _id: req.params._id });
      res.status(200).json({ status: 200, message: "Delete successfull" });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  //payment
  const payment = async (req, res) => {
    if (!stripe) {
      return res.status(500).json({
        status: 500,
        message: "Stripe is not configured. Set STRIPE_SECRET_KEY.",
      });
    }
    const booking = new Booking();
    booking.email = req.body.token.email;
    booking.createdAt = req.body.token.created;
    booking.rooms = req.body.cartItems;
    booking.total = req.body.total;
    booking.paymentMode = req.body.token.type;

    const body = {
      source: req.body.token.id,
      amount: req.body.total,
      currency: "PHP",
    };

    try {
      await stripe.charges.create(body);
      await booking.save();
      return res
        .status(200)
        .json({ status: 200, message: "Transaction successful", booking });
    } catch (err) {
      return res
        .status(400)
        .json({ status: 400, message: "Transaction failed", err });
    }
  };
  //routes

  let router = express.Router();

  router.post("/", upload.array("images", 5), create);
  router.get("/", readMany);
  router.get("/:_id", readOne);
  router.put("/:_id", Auth.isAdmin, upload.array("images", 5), update);
  router.delete("/:_id", Auth.isAdmin, remove);
  router.post("/login", login);
  router.post("/register", register);
  router.get("/verify/:token", verify);
  router.post("/stripe", payment);

  return router;
};
