const express = require("express");
const userRouter = express.Router();
const { getUsers, postUser, updateUser, deleteUser, getUserById, setCookies, getCookies } = require("../controller/userController");
const {protectRoute} = require('../helper');
userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getcookies").get(getCookies);

userRouter.route("/:name").get(getUserById);


module.exports = userRouter;
