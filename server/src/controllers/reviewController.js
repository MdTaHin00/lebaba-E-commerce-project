//! last work code exports

const Product = require("../model/productModel")
const Review = require("../model/reviewModel")
const { errorResponse, successResponse } = require("../utills/responseHander")

const postReview = async(req,res)=>{
    try {
        const {comment,rating,userId,productId} = req.body
        if(!comment || rating == undefined || !userId || !productId){
          return errorResponse(res,404,"Missing required fields")  
        }

        //! review asa ki na check
        const existingReview = await Review.findOne({productId,userId})

        if(existingReview){
            //* 
            existingReview.comment = comment
            existingReview.rating = rating 
            //* aknar update date database save kola
            await existingReview.save()
        }else{
            const newReview = await new Review({comment,rating,userId,productId}).save()
        }

       //* all review data show
       const reviews = await Review.find({productId:productId})

       if(reviews.length > 0 ){

        //* reduce -> database a koyta value aca ta total kolar method 
        //* 0 -> eneseil value 
        const totalRating = reviews.reduce((acc,review)=> acc + review.rating, 0)

        const averageRating = totalRating / reviews.length 

        //* products collection aknar id deya show
        const product = await Product.findById(productId) 

        if(product){
            product.rating = averageRating 
            //* akana ja value pavo ta database save korta hoyva
            await product.save({validateBeforeSave:false})
        }else{
          return errorResponse(res,404,"Product not found")
        }

       }

        successResponse(res,202,"Review Posted successFully",reviews)
    } catch (error) {
      errorResponse(res,404,"Failed to post a review",error)   
    }
}


module.exports = {
    postReview,

}
