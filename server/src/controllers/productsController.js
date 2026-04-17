const Product = require("../model/productModel");
const Review = require("../model/reviewModel");
const { successResponse, errorResponse } = require("../utills/responseHander");

//! add new product
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


//! get all product show
const getAllProduct= async (req,res)=>{
    try {
        //? dexeral query
        const {category,color,minPrice,maxPrice,page=1, limit=8} = req.query
        const filter = {};
        //* all -> frontend ar option tag jokon all na hova
        if(category && category !== 'all'){
            //* filter ar moda category kay operal query category patanoo
            filter.category = category
        }
        if(color && color !== 'all'){
            filter.color = color
        }

        //! maxPrice & minPrice 
        if(minPrice && maxPrice){
            const min = parseFloat(minPrice) 
            const max = parseFloat(maxPrice) 
            if(!isNaN(min) && !isNaN(max)){
                //? $get -> small number , $lte -> bro number
                filter.price = {$get:min, $lte:max}
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit)
        //* countDocuments -> mongoDB function, ja filter a koyta data aca ta call hoy
        const totalProduct = await Product.countDocuments(filter)
        const totalPage = Math.ceil( totalProduct / parseInt(limit))

        const product = await Product.find(filter)
        .skip(skip).limit(parseInt(limit))
        //! populate -> anoo collection ar var run kola
        //* author -> jar var run kortay hova tar name
        //* email username -> ki ki var run kovo tar name
        .populate('author','email username')
        successResponse(res,202,"Products fetched successfully",data={product,totalProduct,totalPage})
    } catch (error) {
        errorResponse(res,404,"Failed to get all Product",error)
    }
}


module.exports = {
    createProducts,
    getAllProduct
}