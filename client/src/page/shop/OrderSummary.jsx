import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

function OrderSummary() {
    const disPatch = useDispatch()

    //? cartSlice file import 
    //* cart -> ja name store a save korce tar name 
    //* products,selectedItems,totalPrice -> cartSlice file ar inseaer object kola import
    const { products, selectedItems, totalPrice } = useSelector((start) => start.cart)

    //? authSlice file ar user object hoy import
    //* user login thaklay ata paya java 
    const { user } = useSelector((state) => state.auth)

    const handelClearCart = (e) => {
        // //? stopPropagation -> jata ka clike kola hova otatay kas anno tatay kono problem hova na 
        e.stopPropagation()
        disPatch(clearCart())
    }


    const handelMakePayment = () => {
        const body = {
            //* ai value backend received korva 
            products:products,
            userId: user?._id
        }
 console.log(body);
 

    }

    return (
        <div className=" bg-primary-light mt-5 rounded text-base">
            <div className="px-6 py-4 space-y-5">
                <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
                <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
                <p className="text-dark mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="px-4 pb-6">
                <button
                    onClick={(e) => handelClearCart(e)}
                    className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4">
                    <span className="mr-2">Clear Cart</span>

                    <i className="ri-delete-bin-7-line"></i>
                </button>
                <button
                    onClick={() => { handelMakePayment() }}
                    className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center">
                    <span className="mr-2">Proceed Checkout</span>
                    <i className="ri-bank-card-line"></i>
                </button>
            </div>
        </div>
    )
}

export default OrderSummary
