const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    first_name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    addnumber: {
        type: String,
        required: true,
    },
    addstreet: {
        type: String,
        required: true,
    },
    addpostcode: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verify_token: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;