const express = require("express");
const app = express();
const userModel=require('./models/userModel')
app.use(express.json());

let user = [
  {
    id: 1,
    name: "Abhishek",
    age: 100,
  },
  {
    id: 2,
    name: "Rajat",
    age: 10,
  },
  {
    id: 3,
    name: "Sunjyot",
    age: 50,
  },
];

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
//   .get(middleware1,getUser,middleware2)
  .get(middleware1,getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:name").get(getUserById);

authRouter.route("/signup").get(getSignup).post(postSignup);
//with query
// app.get('/user', )

// app.post('/user', );

// app.patch('/user', );

// app.delete('/user', )

//params
// app.get('/user/:name', );
function middleware1(req,res,next) {
    console.log("midleware 1 called");
    next();
}

// function middleware2(req,res) {
//     console.log("midleware 2 called");
//     res.json({ msg: "user returned" })
// }

async function getUsers(req, res) {
  console.log(req.query);
  let { name, age } = req.query;
  // let filteredData=user.filter(userObj => {
  //     return (userObj.name==name && userObj.age==age)
  // })
  // res.send(filteredData);
    
    
    //get all users from db
    let allUsers=await userModel.findOne({name:"Abhishek"} )


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
  let doc = await userModel.findOneAndUpdate({ email: "abc@gmail.com" }, dataToBeUpdated);
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

function getSignup(req, res) {
    res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
    // let { email, name, password } = req.body;
    try {
      let data = req.body;
      console.log('in postsignup')
        let user = await userModel.create(data);
        console.log(data);
        res.json({
            msg: "user signed up",
            user
        })
    }
    catch (err) {
        res.json({
            err:err.message
        })
    }
}

app.listen(5000);



// (async function createUser() {
//     let user = {
//         name: "Rajesh",
//         email: "xyz@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();
