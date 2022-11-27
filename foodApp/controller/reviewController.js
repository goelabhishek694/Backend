const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");

module.exports.getAllReviews = async function (req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        msg: "review retrieved",
        reviews,
      });
    } else {
      return res.json({
        msg: "reviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.top3Review = async function (req, res) {
  try {
    const top3 = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (top3) {
      return res.json({
        msg: "review retrieved",
        top3,
      });
    } else {
      return res.json({
        msg: "reviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.getPlanReview = async function (req, res) {
  try {
    const planId = req.params.id;
      let reviews = await reviewModel.find();
      reviews = reviews.filter(review => review.plan["_id"] == planId);
    if (reviews) {
      return res.json({
        msg: "reviews retrieved",
        reviews,
      });
    } else {
      return res.json({
        msg: "reviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.createReview = async function (req, res) {
    try {
    const planId = req.params.plan;
    const plan = await planModel.findById(planId);
    const review = req.body;
    const postReview = await reviewModel.create(review);
    // plan.ratingsAverage =
    //   (plan.ratingsAverage * plan.nor + req.body.rating) / (plan.nor + 1);
    // plan.nor += 1;
    // await plan.save();
    await postReview.save();

    return res.json({
      msg: "review posted",
      postReview,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.updateReview = async function (req, res) {
    try {
        let planId = req.params.plan; //which plan's review is being updated
        let id = req.body.id; //which review needs to be updated
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            if (key == id) continue;
            keys.push(key);
        }
        // key.include("rating")
        //use review's rating to calculate avg rating and update in plan
        let review = await reviewModel.findById(id);
        for (let i = 0; i < keys.length; i++){
            review[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await review.save();
        return res.json({
            message: "plan updated succesfully",
            review
        })
    }
    catch (err) {
        return res.json({
            msg:err.message
        })
    }
}

module.exports.deleteReview = async function (req, res) {
    try {
        let planId = req.params.plan;
        let id = req.body.id;
        //change avg rating of plan 
        let review = await reviewModel.findByIdAndDelete(id);
        res.json({
            message: "review deleted"
        })
    }
    catch (err) {
        return res.json({
            msg:err.message
        })
    }
}
