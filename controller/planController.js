const planModel = require("../models/planModel");

module.exports.getAllPlans = async function (req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        msg: "all plans retrieved",
        data: plans,
      });
    } else {
      //return with apt status code
      return res.json({
        msg: "plans not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.getPlan = async function (req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        msg: "plan retrieved",
        data: plan,
      });
    } else {
      //return with apt status code
      return res.json({
        msg: "plan not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.createPlan = async function (req, res) {
  try {
    let plan = req.body;
    let createdPlan = await planModel.create(plan);
    return res.json({
      msg: "plan created succesfully",
      createdPlan,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.updatePlan = async function (req, res) {
  try {
    let id = req.params.id;
    console.log("qwerty -> ", id);
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
    return res.json({
      msg: "plan updated succesfully",
      plan,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.deletePlan = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      msg: "plan deleted succesfully",
      deletedPlan,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.top3Plans = async function (req, res) {
    try {
        const plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
        return res.json({
            msg: "top3 plans",
            data:plans
        })
    }
    catch (err) {
        res.json({
            msg:err.message
        })
    }
}
