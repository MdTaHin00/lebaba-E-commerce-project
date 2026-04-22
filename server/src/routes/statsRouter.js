const express = require('express')
const { getUserStatsByEmail, getAdminStats } = require('../controllers/statsControllers')
const router = express.Router()


//? get user stats by email 
router.get("/user-stats/:email", getUserStatsByEmail )


//? get admin stats 
router.get('/admin-stats', getAdminStats)

module.exports = router