const express = require('express')
const { makePaymentRequest, confirmPayment } = require('../controllers/orderControllers')
const router = express.Router()
//! last work
//* module.export = router



//? create checkout session
router.post('/create-checkout-session', makePaymentRequest )

//? confirm payment  
router.post('/confirm-payment' , confirmPayment)


module.exports = router