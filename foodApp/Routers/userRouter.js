const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
userRouter
  .route("/")
  .get(middleware1, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter
    .route("/setcookies")
    .get(setCookies);

userRouter
    .route("/getcookies")
    .get(getCookies);

userRouter
    .route("/:name")
    .get(getUserById);

function middleware1(req, res, next) {
  console.log("midleware 1 called");
  next();
}

async function getUsers(req, res) {
  console.log(req.query);
  let { name, age } = req.query;
  // let filteredData=user.filter(userObj => {
  //     return (userObj.name==name && userObj.age==age)
  // })
  // res.send(filteredData);

  //get all users from db
  let allUsers = await userModel.findOne({ name: "Abhishek" });

  res.json({ msg: "users retrieved", allUsers });
  // console.log("getUser called ");
  // next();
}

function postUser(req, res) {
  console.log(req.body.Name);
  //then i can put this in db
  user.push(req.body);
  res.json({
    message: "Data received successfully",
    user: req.body,
  });
}

async function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  // for (key in dataToBeUpdated) {
  //   user[key] = dataToBeUpdated[key];
  // }
  let doc = await userModel.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    message: "data updated succesfully",
  });
}

async function deleteUser(req, res) {
  // user = {};
  // let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
  // let doc = await userModel.findOneAndRemove({ email: "abcde@gmail.com" });
  let user = await userModel.findOne({ email: "abc@gmail.com" });
  console.log(user);
  let del = await user.remove();
  console.log(del);
  res.json({
    msg: "user has been deleted",
  });
}

function getUserById(req, res) {
  console.log(req.params.name);
  //let {id}=req.params;
  // let user = db.findOne(id);
  res.json({ msg: "user id is ", obj: req.params });
}

function setCookies(req, res) {
  // res.setHeader('Set-Cookie', 'isLoggedIn=true');
  res.cookie("isLoggedIn", false, { maxAge: 10000, secure: true });
  res.cookie("password", 12345678, { secure: true });
  res.send("cookies has been set");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("cookies received");
}

module.exports = userRouter;