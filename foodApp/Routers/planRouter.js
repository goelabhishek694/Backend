const express = require('express');
const { protectRoute, isAuthorised } = require('../helper');
const planRouter = express.Router();


planRouter
    .route('/allPlans')
    .get(getAllPlans);

planRouter.use(protectRoute) //logged in hai ya nhi 
planRouter
    .route('/plan/:id')
    .get(getPlan)

planRouter.use(isAuthorised(['admin','restaurantowner'])) // logged in , lekin role 
planRouter
    .route('/crudPlan')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan)



// planRouter
//     .route()
//     .get(top3Plans)






















module.exports = planRouter;