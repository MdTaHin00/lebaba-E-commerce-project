import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0
}

const calculatedCartTotals = (product) => {
    //* reduce -> total value jok kola 
    //* reduce -> two var received 
    //* 0 -> eneselar value
    const selectedItems = product.reduce((total, product) => total + product.quantity, 0)
    const totalPrice = product.reduce((total, product) => total + product.quantity * product.price, 0)

    return { selectedItems, totalPrice }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

        //! add to cart method
        addToCart: (state, action) => {
            //* product aca ki na check
            const isExist = state.products.find((product) => product._id === action.payload._id)

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
                //* product add success alert
                Swal.fire({
                    title: "Product Added successFully",
                    icon: "success",
                    draggable: true
                });

            } else {
                //* product added error alert
                Swal.fire({
                    icon: "error",
                    title: "Product added already to cart",
                    text: "error",
                    confirmButtonText: "It's Ok"
                });
            }
            const totals = calculatedCartTotals(state.products)
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice
        },

        //! quantity update method
        updateQuantity: (state, action) => {
            //* product aca ki na check
            //* payload.id -> jaka nay ai function use korvo ,sai kan thaka asva
            const checkProduct = state.products.find((item) => item._id === action.payload.id)

            if (checkProduct) {
                //? cartSummery ta input type name jode increment hoy 
                if (action.payload.type === "increment") {
                    checkProduct.quantity += 1
                } else if (action.payload.type === "decrement" && checkProduct.quantity > 1) {
                    checkProduct.quantity -= 1
                }
                //? value update hoy tar kas
                const totals = calculatedCartTotals(state.products)
                state.selectedItems = totals.selectedItems;
                state.totalPrice = totals.totalPrice

            }
        },

        //! remove the cart 
        removeFromCart: (state, action) => {
            //* payload.id -> jaka nay ai function use korvo ,sai kan thaka asva
            state.products = state.products.filter((product) => product._id !== action.payload.id)
            //? value update hoy tar kas
            const totals = calculatedCartTotals(state.products)
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice

        },

        //! clear Cart 
        clearCart:(state)=>{
            //* object initialState  0 kola deva
            Object.assign(state,initialState)
        }


    }


})

export const { addToCart, updateQuantity, removeFromCart,clearCart } = cartSlice.actions
export default cartSlice.reducer
