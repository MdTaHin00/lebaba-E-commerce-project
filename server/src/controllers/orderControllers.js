const { errorResponse } = require("../utills/responseHander")

//! stripe website import 
//? Home/Get started/About the APIs/Checkout Sessions API -> thakay stripe import
//* STRIPE_SECRET_KEY -> .env file var
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const makePaymentRequest = async (req,res)=>{
    const {products,userId} = req.params;

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                image:[product.image]
            },
            unit_amount : Math.round(product.price * 100)
        },
        quantity: product.quantity
    }));

    try {
        //* await ar por stripe ar code
        const session = await stripe.checkout.sessions.create({
            line_items = lineItems,
            payment_method_types:["card"],
            mode:"payment",
        })
    } catch (error) {
    errorResponse(res,404,"Failed to create payment session",error)  
    }

}

module.exports = {
    makePaymentRequest
}