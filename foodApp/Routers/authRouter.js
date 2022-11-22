const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const { JWT_KEY } =require('../helper')
// authRouter
//     .route("/signup")
//     .get(getSignup)
//     .post(postSignup);

// authRouter
//     .route('/login')
//     .post(loginUser);



module.exports = authRouter;