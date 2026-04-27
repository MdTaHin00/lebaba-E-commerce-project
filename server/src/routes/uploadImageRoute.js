const express = require('express')
const UploadImage = require('../controllers/uploadImageControllers')
const router = express.Router()


router.post("/uploadImage", UploadImage)


module.exports = router 