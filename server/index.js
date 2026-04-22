const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const port = process.env.PORT
const cors = require('cors')

//! body-parser import 
const bodyParser = require('body-parser')


//! user routes require
const userRoute = require('./src/routes/userRouter')
const productsRoute = require('./src/routes/productRouter')
const reviewRoute = require('./src/routes/reviewRoute')
const orderRoute = require('./src/routes/orderRouter')
const statsRouter = require('./src/routes/statsRouter')


//! middleware
app.use(express.json())
app.use(cors({
    //! frontend url  
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(bodyParser.json())


//! use userRoute
//* first ai route tar por userRoute.js file route
//* /api/auth/(userRoute.js)
app.use('/api/auth',userRoute)

//! use productsRoute
//* first ai route tar por productsRoute.js file route
//* /api/products/(productsRoute.js)
app.use('/api/products', productsRoute)

//! use reviewRoute
//* first ai route tar por reviewRoute.js file route
//* /api/reviews/(reviewRoute.js)
app.use('/api/reviews', reviewRoute)


//! use orderRoute
//* first ai route tar por orderRoute.js file route
//* /api/reviews/(orderRoute.js)
app.use('/api/orders', orderRoute)


//! use statsRouter
//* first ai route tar por statsRouter.js file route
//* /api/reviews/(statsRouter.js)
app.use('/api/stats', statsRouter)


//! mongoose and mongoBD connection
async function main() {
    await mongoose.connect(process.env.DB_URL)

    app.get("/", (req, res) => {
        res.send("Lebaba E-commerce Server is running..")
    })


}



main().then(() => console.log("MongoBD connected successfully"))
    .catch((ee) => console.log(ee))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// mdtahinhassanjihad_db_user
// VsYWKpgc4fd5Qljt