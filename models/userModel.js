const mongoose = require("mongoose");
const { db_link } = require("../secrets");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("user db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  confirmPassword: {
    type: String,
    // required: true,
    minLength: 7,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
    default:'user'
  },
  profileImage: {
    type: String,
    default:'img/users/default.jpg'
  },
  resetToken: { type: String }

});

//-------------->learning hooks<-----------------
// userSchema.pre('save', function () {
//   console.log("before saving in db");
// })

// userSchema.post("save", function () {
//   console.log("after saving in db");
// });

userSchema.pre("save", function () {
  // console.log("before saving in db");
  this.confirmPassword = undefined;
});

// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     console.log(salt);
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
//     // console.log(hashedString);
// })

userSchema.methods.createResetToken = async function () {
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  // this.confirmPassword = this.password;
  await this.save();
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};






//models
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;