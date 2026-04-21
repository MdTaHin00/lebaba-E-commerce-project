const express = require('express')
const { makePaymentRequest } = require('../controllers/orderControllers')
const router = express.Router()
//! last work
//* module.export = router



//? create checkout session
router.post('/create-checkout-session', makePaymentRequest )



module.exports = router