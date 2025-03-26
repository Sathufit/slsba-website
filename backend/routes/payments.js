const express = require("express");
const stripe = require("stripe")("sk_test_51R4FPYGfn39KTTSnnv8DJfUYcbZglDhIysDBrd2cMRw0FLgsJHyJ8fTvAreRJdiqG9ksjUBLj54BT3l6OSuvTbBA00gypTRXFz"); // Replace with your Stripe Secret Key
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, registrationData } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tournament Registration",
              description: "Entry fee for tournament",
            },
            unit_amount: amount, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
