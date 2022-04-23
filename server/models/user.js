const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: false,
    }
})

//Able to pass name of collection into mongoose model function
const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;