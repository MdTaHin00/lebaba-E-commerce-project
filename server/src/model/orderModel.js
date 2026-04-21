const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:String,
    orderId:String,
    products:[
       {
        productId:{type:String,required:true},
        quantity:{type:Number,required:true}
       }
    ],
    email:{type:String , required: true},
    amount:Number,
    status:{
        type:String,
        enum:['padding','processing','shipped','completed'],
        default:'padding'
    }
}, {
    timestamps:true
})

//? 'Order' -> ai name a mongoose collection a save hova
const Order = mongoose.model('Order',orderSchema)
module.exports = Order ;