const express = require('express')
const { makePaymentRequest, confirmPayment, getOrdersByEmail, getOrdersById, getAllOrders, updateOrderStatus, deleteOrderById } = require('../controllers/orderControllers')
const router = express.Router()
//! last work
//* module.export = router



//* create-checkout-session,confirm-payment ai two router kas frontend shop folder ar payment folder use kola hoyca
//? create checkout session
router.post('/create-checkout-session', makePaymentRequest)

//? confirm payment  
router.post('/confirm-payment', confirmPayment)



//? get orders by email 
router.get('/:email', getOrdersByEmail)

//? get orders by id 
router.get("/order/:id", getOrdersById)

//?  get all order (only admin)
router.get("/", getAllOrders)

//? update order status by id (only admin)
//* patch method 
router.patch("/update-order-status/:id", updateOrderStatus)

//? delete order by id (only admin)
//* delete method
router.delete("/delete-order/:id",deleteOrderById)


module.exports = router