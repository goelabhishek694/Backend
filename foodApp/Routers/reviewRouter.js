const express = require("express");
const reviewRouter = express.Router();
const { isAuthorised, protectRoute } = require('../helper');

reviewRouter
    .route("/all")
    .get(getAllReviews);

reviewRouter
    .route("/top3")
    .get(top3Review);

//all reviews of a particular plan
reviewRouter
    .route("/:id")
    .get(getPlanReview);

reviewRouter.use(protectRoute)
reviewRouter
   .route("/crud:/plan")
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview)


module.exports = reviewRouter;