const generateToken = require("../middleware/generateToken");
const User = require("../model/userModel");

//!  register
//? post method 
const register = async (req, res) => {
    try {
        const {username,email,password} = req.body;

        //* save() -> data mongoBD database save kolar function
        const user = new User({ username,email,password});
        const result = await user.save()
        //* another wey 
        // const user = new User({...req.body})  
        res.status(202).send({message:"Register Successfully",user:result})

    } catch (error) {
        res.status(404).send({ message: "Registration failed", error })
    }
}

//! login 
//? post method
const login = async(req,res)=>{
    try {

        const{email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).send({message:"User not found"})
        }

        //? register and login password match method
        //* comparePassword -> ai function kas userModel kola holo
        const isMatch = await user.comparePassword(password)
         if(!isMatch){
            return res.status(404).send({message:"Invalid Password"})
         }

         //! token method
         //* generateToken -> ai function kas
         //* middleware folder a kola hoy ca
         //* generateToken -> require korce ai
         const token = await generateToken(user._id)

         //! local Stores set kola token 
         //* 'token' -> ja name localStores a same hova tar name
         res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"None"
         })

         //! user ka ja ja deivo 
         res.status(200).send({
            message:"Logged in successFully",
            token:token,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role,
                profileImage:user.profileImage,
                boi:user.boi,
                profession:user.profession
            }
         })
        
        
    } catch (error) {
        res.status(404).send({message:"Login user failed"}) 
    }
}


//! Logout method
const logout = async(req,res)=>{
    try {
    //* clearCookie -> cookie delete kola
    //* "token" -> ja namey cookie sava koce say name
    res.clearCookie("token")
    res.status(200).send({message:"Logout successfully"})
    } catch (error) {
       res.status(404).send({message:"Logged out failed"})        
    }
}  
 


module.exports = {
    register,
    login,
    logout,

}