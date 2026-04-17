const express = require('express')
const { postReview, getUserReview, getTotalReviewsCount } = require('../controllers/reviewController')
const router = express.Router()
//! last work code 
//? module.exports = router


//! add review
//? post method
router.post('/post-review', postReview)


//! review counts
//? get method
//* total method all var kas kolar janno  getUserReview route pora call kola hoyca
router.get("/total-reviews", getTotalReviewsCount)


//! get review data for user 
//? get method
router.get('/:userId', getUserReview)





module.exports = router 