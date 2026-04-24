const Order = require("../model/orderModel")
const Product = require("../model/productModel")
const Review = require("../model/reviewModel")
const User = require("../model/userModel")
const { errorResponse, successResponse } = require("../utills/responseHander")

//!  get user stats by email 
const getUserStatsByEmail = async (req, res) => {
    const {email} = req.params

    if (!email) {
        return errorResponse(res, 404, "Email is required")
    }

    try {
        const user = await User.findOne({email: email})

        if (!user) {
            return errorResponse(res, 404, "User Not Found")
        }

        //? total payment
        //* $match,$group -> mongoBD default code
        const totalPaymentResult = await Order.aggregate([
            { $match: {email:email } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ])

        const totalPaymentsAmount = totalPaymentResult.length > 0 ? totalPaymentResult[0].totalAmount : 0 ;

        //! total review
        const totalReviews = await Review.countDocuments({userId:user._id})

        //!  push product id 
        const purchasedProductsIds = await Order.distinct("products.productId", {email:email})
        const totalPurchasedProducts = purchasedProductsIds.length;
        
        successResponse(res,202,"Fetched User stats successfully",{
            totalPaymentResult: Number(totalPaymentsAmount),
            totalReviews,
            totalPurchasedProducts
        })

    } catch (error) {
        errorResponse(res, 404, "Couldn't get user stats", error)
    }

}



//! get admin stats 
const getAdminStats= async (req,res)=>{
   try {
    //? countDocuments -> database total value dey

    //* count total orders
    const totalOrders = await Order.countDocuments() 
    //* count total products
    const totalProduct = await Product.countDocuments()
    //* count total Reviews 
    const totalReviews = await Review.countDocuments()
    //* count total users
    const totalUsers = await User.countDocuments()

    //! calculate total earning by amount
    const totalEarningResult = await Order.aggregate([
        {$group:{
            _id:null,
            totalEarnings:{$sum : "$amount"}
        }}
    ])

    const totalEarning = totalEarningResult.length > 0 ? totalEarningResult[0].totalEarnings : 0 ;
    //* rename add tofixed()
    const totalEarnings = totalEarning.toFixed(2)


    //! monthly earning by amount
    const monthlyEarningsResult = await Order.aggregate([
        {
          $group :{
        _id:{month:{$month:"$createdAt"}, year:{$year:"$createdAt"}},
        monthlyEarnings:{$sum:"$amount"}
        }
       },
       {
        $sort:{"_id.year":1, "_id.month": 1}
       }
    ])

    //? data formate kola
    const monthlyEarnings = monthlyEarningsResult.map((entry) => ({
        month: entry._id.month,
        year: entry._id.year,
        earnings: entry.monthlyEarnings
    }))


    //? send data
    successResponse(res,202,"Admin stats successFully",{
        totalOrders,
        totalProduct,
        totalReviews,
        totalUsers,
        totalEarnings,
        monthlyEarnings
    })

   } catch (error) {
     error(res,404,"failed admin stats", error)
   }
}

module.exports = {
    getUserStatsByEmail,
    getAdminStats
}