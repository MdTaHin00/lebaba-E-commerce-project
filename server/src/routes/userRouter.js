const express = require('express')
const { register, login, logout } = require('../controllers/userControllers')
const router = express.Router()

//! register route
router.post("/register",register)

//! login route
router.post("/login",login)

//! logout route
router.post("/logout",logout)

module.exports = router    
