const Product = require("../model/productModel");
const Review = require("../model/reviewModel");
const { successResponse, errorResponse } = require("../utills/responseHander");


const createProducts = async (req,res)=>{
    try {
        const product = await new Product({...req.body}).save();

        //! rating calculate method
        //* Review ar productId moday product id patanoo hoyca
        const review = await Review.find({productId:product._id})

        if(review.length > 0){
            //! total rating
            const totalRating = review.reduce((acc,pre)=> acc + pre.rating, 0)
            //! average rating 
            const averageRating = totalRating / review.length ;
            product.rating = averageRating
            await product.save()
        }

        successResponse(res,202,"Products Create Successfully",product)

    } catch (error) {
    errorResponse(res,404,"Products Create Failed",error) 
    }  
}


module.exports = {
    createProducts,

}