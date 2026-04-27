const Product = require("../model/productModel");
const Review = require("../model/reviewModel");
const { successResponse, errorResponse } = require("../utills/responseHander");

//! last word export code


//! add new product
const createProducts = async (req,res)=>{
 try {
        const newProduct =  new Products({
            ...req.body
        })

        const product =  await newProduct.save();

        // calculate avarage rating
        const reviews = await Review.find({productId: product._id })
        
        if(reviews.length > 0) {
            const totalRating =  reviews.reduce((acc, review) => acc + review.rating, 0 )
            const avarageRating = totalRating / reviews.length;
            product.rating = avarageRating;
            await product.save();
        }

        return successResponse(res, 200, "Product created successfully", product)
        
    } catch (error) {
        return errorResponse(res, 500, "Failed to create new product", error)
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
                filter.price = {$gte:min, $lte:max}
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit)
        //* countDocuments -> mongoDB function, ja filter a koyta data aca ta call hoy
        const totalProduct = await Product.countDocuments(filter)
        const totalPage = Math.ceil( totalProduct / parseInt(limit))

        const product = await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        //! populate -> anoo collection ar var run kola
        //* author -> jar var run kortay hova tar name
        //* email username -> ki ki var run kovo tar name
        .populate('author','email username')
        .sort({createdAt: -1})

        successResponse(res,202,"Products fetched successfully",data={product,totalProduct,totalPage})
    } catch (error) {
        errorResponse(res,404,"Failed to get all Product",error)
    }
}


//! get single product
const getSingleProduct = async (req,res)=>{
  const {id} = req.params
  try {
    const product = await Product.findById(id)
      //! populate -> anoo collection ar var run kola
      //* author -> jar var run kortay hova tar name
      //* email username -> ki ki var run kovo tar name
    .populate('author',('username email'))

    if(!product){
        return errorResponse(res,404,"Product not found")
    }

    //! review find 
    //* Review ar productId moday params ar id patanoo hoyca
    const review = await Review.find({productId:id})
    //! populate -> anoo collection ar var run kola
    //* userId -> jar var run kortay hova tar name
    //* email username -> ki ki var run kovo tar name
    .populate('userId',('username email'))

    successResponse(res,202,"Single Product and review successfully",{product,review})
  } catch (error) {
     errorResponse(res,404,"Failed get to single product",error)
  }
}


//! update product by id
const updateProductById = async (req,res)=>{
   const productId = req.params.id 
   try {
    const updateProduct = await Product.findByIdAndUpdate(productId,{...req.body},{new:true})
    
    
    if(!updateProduct){
        return errorResponse(res,404,"Product not found")
    }

   successResponse(res,202,"Product updated successfully",updateProduct)

   } catch (error) {
      errorResponse(res,404,"Failed to update",error)
   }
}


//! delete product by id 
const deletedProductById = async (req,res)=>{
   const productId = req.params.id;
   try {
     const deleteProduct = await Product.findByIdAndDelete(productId) 
      if(!deleteProduct){
        errorResponse(res,404,"Product not found")
      }

      await Review.deleteMany({productId: productId})

      successResponse(res,202,"Product delete successfully",productId)

   } catch (error) {
    errorResponse(res,404,"Failed to delete product",error)
   }
}

module.exports = {
    createProducts,
    getAllProduct,
    getSingleProduct,
    updateProductById,
    deletedProductById
}