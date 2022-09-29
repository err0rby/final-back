const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    
    firstName: String, 
    lastName: String,
    email: String,
    password: String,
    verified: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User