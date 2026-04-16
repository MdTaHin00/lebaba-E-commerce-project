const express = require('express')
const { register, login, logoutUser, getAllUsers, deletedUser } = require('../controllers/userControllers')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()

//! register route
router.post("/register",register)

//! login route
router.post("/login",login)

//! logout route
router.post("/logout",logoutUser)

//! all show route (only admin jonno ai code)
//* verifyToken -> ata akta middleware & middleware call kola hoyca
//? 1st kas verifyToken, 2nd kas verifyAdmin ,3nd kas getAllUsers
router.get("/users", verifyToken , verifyAdmin , getAllUsers)


//! delete router (only admin janno ai code)
//? 1st kas verifyToken, 2nd kas verifyAdmin ,3nd kas deletedUser
router.delete("/users/:id", verifyToken , verifyAdmin , deletedUser )




module.exports = router    
