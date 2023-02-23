const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @dec         Login  user
// @route       POST api/users/login
// @acess       Public
const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        res.status(400)

        throw new Error("Please fill all the details")
    }

    // check fo user email
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)

        throw new Error("Invalid credentials")
    }

})


// @dec         Register new user
// @route       POST api/users
// @acess       Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all the fields")
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(400)
        throw new Error("user already exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPwd
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);

        throw new Error("Invalid user data")
    }
})


// @dec         Get user data
// @route       GET api/users/me
// @acess       Private
const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user)
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}


module.exports = {
    loginUser,
    registerUser,
    getMe
}