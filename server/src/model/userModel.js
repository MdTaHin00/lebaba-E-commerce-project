const mongoose = require('mongoose')
const { Schema } = mongoose;

//! bcrypt npm -> password hash kola
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: String,
    bio: { type: String, maxLength: 200 },
    profession: String,
    role: {
        type: String,
        default: 'user'
    },
    createdAt: { type: Date, default: Date.now }
})

//! hash password method
//* pre -> default function
//* 'save' -> database data save kola agka kas kola
userSchema.pre('save', async function (next) {
    try {
        //* this -> userSchema modar user
        const user = this;
        //* isModified -> default function ja modified kola
        //* 'password' -> ki modified korva tar name
        if (!user.isModified('password')) return next();
        //* hash -> password hash korva
        //* 10 -> default value
        const hashPassword = await bcrypt.hash(user.password, 10)
        user.password = hashPassword;
        next();
    } catch (error) {
        console.log(error);

    }
})

//! comparePassword
//* methods -> mongoose default code
//* comparePassword -> userController file login ar function
userSchema.methods.comparePassword = function (clientPassword){
    //* compare -> bcrypt function ja password match kola
    return bcrypt.compare(clientPassword, this.password)
}

//! User -> ja name a database collection a model add hova ta
const User = mongoose.model('User', userSchema)

//? require sentex tai exports
module.exports = User