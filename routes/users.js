const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const userController = require("../controllers/userController");

router
  .route("/register")
  .get(userController.renderRegisterForm)
  .post(catchAsync(userController.registerUser));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.loginUser
  );

router.get("/logout", userController.logoutUser);

module.exports = router;
