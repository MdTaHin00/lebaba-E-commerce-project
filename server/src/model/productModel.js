const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:String,
    description:String,
    price:{
        type:String,
        required:true
    },
    oldPrice:Number,
    image:{
        type:String,
        required:true
    },
    color:String,
    rating:{
        type:Number,
        default:0
    },
    author:{
        //*type hova mongoose ar Schema ar moderal ObjectId
        type : mongoose.Schema.Types.ObjectId,
        //* ref:'User' -> userModel ar replans hova
        ref:'User'
    }
},{
    //? timestamps:true -> data update & create somay dehaka jay
    timestamps:true
}
)

//? "Product" -> ja namay database collection name make hova tar name
const Product = mongoose.model("Product", productSchema)

module.exports = Product ;