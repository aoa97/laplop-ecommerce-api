import asyncHandler from 'express-async-handler';
import User from './../models/userModel.js';

// @desc    Register a user by name, email & password
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const exist = await User.findOne({ email: req.body.email })

    if (exist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await user.save()

    res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
    })
})

// @desc    Login a user by email & password
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
    })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user
    res.send({ _id, name, email })
})

// @desc    Update user profile 
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { user } = req

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.send({
        _id: user._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: await user.generateAuthToken()
    })
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password -tokens')
    res.send(users)
})

// @desc    Get a user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -tokens')

    if (user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.send({ message: "User has been removed" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc    Update user  
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    if (req.body.password) {
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.send({
        _id: user._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
})


export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} 