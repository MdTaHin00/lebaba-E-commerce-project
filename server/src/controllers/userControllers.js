const generateToken = require("../middleware/generateToken");
const User = require("../model/userModel");
const { errorResponse, successResponse } = require("../utills/responseHander");

//!  register
//? post method 
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //* save() -> data mongoBD database save kolar function
        const user = new User({ username, email, password });
        const result = await user.save()
        //* another wey 
        // const user = new User({...req.body})  
        res.status(202).send({ message: "Register Successfully", user: result })

    } catch (error) {
        res.status(404).send({ message: "Registration failed", error })
    }
}

//! login 
//? post method
const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            //* errorResponse -> utills folder responseHandel file function
            return errorResponse(res, 404, "user not found")
        }

        //? register and login password match method
        //* comparePassword -> ai function kas userModel kola holo
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            //* errorResponse -> utills folder responseHandel file function
            return errorResponse(res, 404, "Invalid Password")
        }
        //! token method
        //* generateToken -> ai function kas
        //* middleware folder a kola hoy ca
        //* generateToken -> require korce ai
        const token = await generateToken(user._id)

        //! local Stores set kola token 
        //* 'token' -> ja name localStores a same hova tar name
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })

        //! user ka ja ja deivo 
        res.status(200).send({
            message: "Logged in successFully",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession
            }
        })


    } catch (error) {
        errorResponse(res, 404, "Login user failed", error)
    }
}


//! Logout method
const logoutUser = async (req, res) => {
    try {
        //* clearCookie -> cookie delete kola
        //* "token" -> ja namey cookie sava koce say name
        res.clearCookie("token")
        successResponse(res, 202, "Logout successfully")
    } catch (error) {
        errorResponse(res, 404, "Logout successfully failed")
    }
}


//! get all user data show 
const getAllUsers = async (req, res) => {
    try {
        //* {},('email,role) -> database thaka soto email,role data asva
        //* -1 -> sovsas ja data create hoyca sata first asva
        const users = await User.find({},'email role').sort({ createdAt: -1 })

        successResponse(res, 200, "Success Show all User", data = users)
    } catch (error) {
        errorResponse(res, 500, "Failed to fetch all user", error)
    }
}


//! delete method (admin user deleted)
const deletedUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return errorResponse(res, 404, "User not found")
        }

        return successResponse(res, 200, "Users deleted successfully")
    } catch (error) {
        errorResponse(res, 404, "Failed admin delete user", errorResponse)
    }
}


//! put method (admin user role update)
const updateUserRole = async (req, res) => {
    const { id } = req.params
    const { role } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id, { role }, { new: true })

        if (!updateUser) {
            return errorResponse(res, 404, "User not found")
        }

        successResponse(res, 200, "User role Update successFully", data = updateUser)
    } catch (error) {
        errorResponse(res, 404, "Failed to update user role", error)
    }
}


//!  patch method edit user profile
const editUserProfile = async (req, res) => {
    const { id } = req.params;
    const { username, profileImage, bio, profession } = req.body;

    try {
        // Only include fields that exist
        const updateFields = {};

        if (username) updateFields.username = username;
        if (profileImage) updateFields.profileImage = profileImage;
        if (bio) updateFields.bio = bio;
        if (profession) updateFields.profession = profession;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return errorResponse(res, 404, "User not found");
        }

        return successResponse(res, 200, "User profile updated successfully", {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
            bio: updatedUser.bio,
            profession: updatedUser.profession,
        });

    } catch (error) {
        return errorResponse(res, 500, "Failed to update user profile", error);
    }
};

module.exports = {
    register,
    login,
    logoutUser,
    getAllUsers,
    deletedUser,
    updateUserRole,
    editUserProfile

}