const express = require('express')
const { createProducts } = require('../controllers/productsContrpller')
const router = express.Router()
//! last work 
//? module.exports = router

//! create add products
router.post("/create-product", createProducts )


module.exports = router