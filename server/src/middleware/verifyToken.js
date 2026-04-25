const { errorResponse, successResponse } = require("../utills/responseHander")

const jwt = require('jsonwebtoken')

//* secret code input .env file thaka
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req,res,next)=>{
    try {
        //* ai code frontend a token use kolar code
        //? token ka cookie set kola
        const token = req.cookies.token 
        
        //* backend ar postMan thaka token dakar janno
        // const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return successResponse(res,404,"Unauthorized Access!")
        }
        //* operal ja token payce ta verify kola code 
        const decoded = jwt.verify(token, JWT_SECRET)
         if(!decoded.userId){
            return res.status.send({message:"Access denied"})
         }
         //* req.userId -> token ar moda ja userId pai sayta
         //* decoded.userId -> req.userId ar data kay ataky daya
         req.userId = decoded.userId
         req.role = decoded.role 
         next()
    } catch (error) {
        errorResponse(res,404,"Invalid Token",Error)
    }
}

module.exports = verifyToken


