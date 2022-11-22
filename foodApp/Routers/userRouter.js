const express = require("express");
const userRouter = express.Router();
const { getUser, postUser, updateUser, deleteUser, getAllUser} = require("../controller/userController");
const {protectRoute} = require('../helper');

//user ke options
userRouter
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

//profile page
app.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)

//admin specific function
app.use(isAuthorised(['admin']));
userRouter.route('')
.get(getAllUser)


module.exports = userRouter;
