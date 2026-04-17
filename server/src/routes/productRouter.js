const express = require('express')
const { createProducts, getAllProduct, getSingleProduct, updateProductById, deletedProductById } = require('../controllers/productsController')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()
//! last work code 
//? module.exports = router

//! create add products(only admin ar janno)
router.post("/create-product" , createProducts )

//! get all data show 
router.get("/", getAllProduct)

//! get single product
router.get("/:id", getSingleProduct)

//! update product(only admin ar janno)
//? patch method
router.patch("/update-product/:id", verifyToken, verifyAdmin, updateProductById)

//! delete product 
//? delete method 
router.delete("/delete-product/:id", deletedProductById)

module.exports = router