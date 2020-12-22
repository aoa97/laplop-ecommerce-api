import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from './../models/userModel.js';


export const auth = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id, "tokens.token": token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401)
        throw new Error("Please authenticate.")
    }
})

export const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized, the user is not an admin.")
    }
})