var jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const { JWT_KEY } = require("./secrets");

//protectRoute
module.exports.protectRoute = async function (req, res, next) {
  let token;
  if (req.cookies.login) {
    token = req.cookies.login;
    let payloadObj = jwt.verify(token, JWT_KEY);
    const user = await userModel.findById(payloadObj.payload);
    req.id = user.id;
    req.role = user.role;
    if (isVerified) next();
    else {
      req.json({
        msg: "user not verified",
      });
    }
  } else {
    return res.json({
      msg: "opertion not allowed",
    });
  }
};

//isAutorised-? check the user's role
// client will send role key in req obj
module.exports.isAuthorised = function (roles) {
  return function (req, res, next) {
    let role = req.role;
    if (roles.includes(role)) {
      next();
    }
    res.status(401).json({
      msg: "operation not allowed",
    });
  };
};
