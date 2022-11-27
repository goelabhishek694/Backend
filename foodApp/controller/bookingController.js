let SK = "sk_test_pL1X84CZrOSOYRkyyvKuCwR000a36t5jwK";
const stripe = require('stripe')(SK);
const planModel=require("../models/planModel")
const userModel = require("../models/userModel")

module.exports.createSession = async function (req, res) {
    try {
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_type: ['card'],
            customer_email: user.email,
            client_reference_id:plan.id,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            name: plan.name,
            description: plan.description,
            ammount: plan.price * 100,
          currency:'inr',
        quantity: 1,
      },
    ],
    success_url: `${req.protocol}://${req.get("host")}/profile`,
    cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        });
        res.json({
            msg: "success",
            session
        });
    }
    catch (err) {
        res.json({
            err:err.message
        })
    }
}