const express = require("express");
const userRouter = express.Router();
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  allUser,
} = require("../controller/userController");
const {isAuthorised,protectRoute} = require('../helper');
const { signup, login } = require('../controller/authController');

//user ke options
userRouter
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route("/login")
  .post(login);

userRouter
  .route("/signup")
  .post(signup);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").post(resetpassword);

//profile page
userRouter.use(protectRoute)
userRouter
  .route('/profile')
  .get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route("/").get(allUser);


module.exports = userRouter;
