const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    // phone: {
    //     type: String,
    //     required: [true, "Please enter name"]
    // },

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', User)