const User = require("../model/userModel");
const jsonwebtoken = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = async (userId) => {
    try {

        const user = await User.findById(userId);
        if(!user){
            throw new Error("User not found")
        }

        //* sign({ki ki token moda demo ta}, any secret code)
        //* expiresIn -> koto somay token thakva tar somy
        const token = jsonwebtoken.sign({userId:user._id, role:user.role},JWT_SECRET ,{expiresIn:"1h"})
        //* return korta hova na hola kas korva na
         return token;
      
         console.log(token);
         
    } catch (error) {
      console.log("Error Generating token",error);
    }
}

module.exports = generateToken ;