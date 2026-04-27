const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
});


  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };

const imageUpload = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url)
            }
            console.log(error.message)
            return reject({message: error.message})
        })
    })
}

const UploadImage = async (req,res) => {
    //? UploadImage -> utills folder thaka ai function received
    imageUpload(req.body.image)
        .then((url) => res.send(url))
        .catch((error) => res.status(500).send(error))
}


module.exports = UploadImage