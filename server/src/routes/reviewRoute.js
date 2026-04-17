const express = require('express')
const { postReview } = require('../controllers/reviewController')
const router = express.Router()
//! last work code 
//? module.exports = router


//! add review
//? post method
router.post('/post-review', postReview)




module.exports = router 