const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../helper');
const { createSession } = require('../controller/bookingController');
bookingRouter.use(express.static("public"));
bookingRouter.route('/createSession').get(function (req, res) {
    res.sendFile("/Users/abhishekgoel/backend/foodApp/public/index.html");
});
// bookingRouter.use(protectRoute);
bookingRouter.route('/createSession').post(createSession);

module.exports = bookingRouter;



