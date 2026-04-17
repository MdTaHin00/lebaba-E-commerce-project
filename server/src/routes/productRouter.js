const express = require('express')
const { createProducts, getAllProduct } = require('../controllers/productsController')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()
//! last work 
//? module.exports = router

//! create add products(only admin ar janno)
router.post("/create-product" , createProducts )


//! get all data show 
router.get("/", getAllProduct)

module.exports = router