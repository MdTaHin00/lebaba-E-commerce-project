import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

//! stripe code frontend use kolar janno import 
import { loadStripe } from '@stripe/stripe-js';
import { get_Base_url } from '../../utils/getBase_url';
import axios from 'axios'

function OrderSummary() {
    const disPatch = useDispatch()

    //? cartSlice file import 
    //* cart -> ja name store a save korce tar name 
    //* products,selectedItems,totalPrice -> cartSlice file ar inseaer object kola import
    const { products, selectedItems, totalPrice } = useSelector((start) => start.cart)

    //? authSlice file ar user object hoy import
    //* user login thaklay ata paya java 
    const { user } = useSelector((state) => state.auth)

    const handelClearCart = () => {
        // //? stopPropagation -> jata ka clike kola hova otatay kas anno tatay kono problem hova na 
        disPatch(clearCart())
    }


    //!  Stripe payment method

    const handelMakePayment = async () => {
        // 1. Initialize Stripe
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        const body = {
            products: products,
            userId: user?._id
        };
        try {
            // 2. Call your backend
            const response = await axios.post(
                `${get_Base_url()}/api/orders/create-checkout-session`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // ERROR FIX: Check if the response contains the URL
            // Modern Stripe integration prefers window.location.href over redirectToCheckout
            if (response.data.url) {
                window.location.href = response.data.url;
            }
            else if (response.data.id) {
                // Fallback for older redirectToCheckout method
                const result = await stripe.redirectToCheckout({
                    sessionId: response.data.id
                });
                if (result.error) {
                    console.error("Stripe Redirect Error:", result.error.message);
                }
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div className=" bg-primary-light mt-5 rounded text-base">
            <div className="px-6 py-4 space-y-5">
                <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
                <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
                <p className="text-dark mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="px-4 pb-6">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handelClearCart()
                    }}
                    className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4">
                    <span className="mr-2">Clear Cart</span>

                    <i className="ri-delete-bin-7-line"></i>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handelMakePayment()
                    }}
                    className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center">
                    <span className="mr-2">Proceed Checkout</span>
                    <i className="ri-bank-card-line"></i>
                </button>
            </div>
        </div>
    )
}

export default OrderSummary
