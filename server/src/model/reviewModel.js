const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    userId: {
        //* type hova mongoose ar Schema ar moderal ObjectId
        type: mongoose.Schema.Types.ObjectId,
        //* ref:'User' -> userModel ar replans hova
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        //* ref:'Product' -> productModel ar replans hova
        ref: 'Product',
        required: true
    }
},
    {
        //? timestamps:true -> data update & create somay dehaka jay
        timestamps: true
    }
)

//? "Review" -> ja namay database collection name make hova tar name
const Review = mongoose.model("Review", reviewSchema)


module.exports = Review 