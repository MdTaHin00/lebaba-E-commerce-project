const { BASE_URL } = require("../utills/baseURL");
const { errorResponse } = require("../utills/responseHander");
// //! stripe website import 
// //? Home/Get started/About the APIs/Checkout Sessions API -> thakay stripe import
// //* STRIPE_SECRET_KEY -> .env file var
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const makePaymentRequest = async (req, res) => {
    const { products, userId } = req.body;

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    // FIX: Stripe uses 'images' (plural), not 'image'
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/cancel`,
            // Pro-tip: Pass userId in metadata so you can identify the customer in webhooks
            metadata: { userId }
        });

        // FIX: You must send the session data back to the frontend
        res.status(200).json({
            d: session.id, url: session.url
        });

    } catch (error) {
        // Log the error for your own debugging
        console.error("Stripe Session Error:", error);
        // Error handling utility
        errorResponse(res, 500, "Failed to create payment session", error.message);
    }
}

module.exports = { makePaymentRequest };