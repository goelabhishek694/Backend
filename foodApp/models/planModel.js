const mongoose = require("mongoose");
const { db_link } = require("../secrets");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, `plan name should not exceed 20 characters`]
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'price not entered']
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100
        }, 'discount cannot be 100%']
    },
    ratingsAverage: {
        type: Number
    }
});

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;

// (async function createPlan() {
//     let plan = {
//         name: "Superfood",
//         duration: 3,
//         price:'',
//         ratingsAverage: 3.8,
//         discount: 100
//     }
//     let data = await planModel.create(plan);
//     console.log(data);
//     // const doc = new planModel(plan);
//     // await doc.save();
// })();



