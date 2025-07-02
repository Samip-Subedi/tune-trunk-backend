const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")("sk_test_51QjFHlKoddIfgvsOb3EWSwe2Vr11QPP96BBr2qZRaxLwI3iGyv8NPsfTfGisNFaWsR03SUpH6PSDYUQg81XO99Zn00Qn5hEESC");

exports.Payment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "MERN",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
