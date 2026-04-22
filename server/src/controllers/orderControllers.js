const Order = require("../model/orderModel");
const { BASE_URL } = require("../utills/baseURL");
const { errorResponse, successResponse } = require("../utills/responseHander");
// //! stripe website import 
// //? Home/Get started/About the APIs/Checkout Sessions API -> thakay stripe import
// //* STRIPE_SECRET_KEY -> .env file var
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//! stripe website payment method system
//? post method
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

        //! stripe website payment method code
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
            id: session.id, url: session.url
        });

    } catch (error) {
        // Error handling utility
        errorResponse(res, 500, "Failed to create payment session", error.message);
    }
}



//! stripe website confirm payment system
//? post method
const confirmPayment = async(req,res) => { 
  const {session_id} = req.body;
  
  try { 
    //* stripe code confirm payment janno
     const session = await stripe.checkout.sessions.retrieve(session_id,{
         //* payment_intent -> stripe default cose 
        expand:["line_items","payment_intent"]
     })
       //* stripe code confirm payment janno
     const paymentIntentId = session.payment_intent.id;
    
     let order = await Order.findOne({orderId:paymentIntentId})
  
     if(!order){
         //* stripe code confirm payment janno
        const lineItems = session.line_items.data.map((item)=>({
            productId: item.price.product,
            quantity: item.quantity
        }))
        //* makePaymentRequest function a unit_amount jata add korce ota bat dece
        const amount = session.amount_total / 100
        order = new Order({
             orderId:paymentIntentId,
             products:lineItems,
             amount:amount,
             email:session.customer_details.email,
             status: session.payment_intent.status ==="succeeded" ? "pending" : "failed"
        })
     }else{
        order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed"
     }

     await order.save()

    return successResponse(res,202,"Order Confirmed successfully",order)
    
} catch (error) {
   return errorResponse(res,404,"Failed to confirm payment") 
  }
}


module.exports = {
    makePaymentRequest, confirmPayment
};