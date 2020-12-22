import express from 'express'
import { deleteUser, getUser, getUserProfile, getUsers, loginUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import { auth, admin } from '../middlewares/authMiddleware.js'

const router = new express.Router()

// Handlers
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', auth, getUserProfile)
router.get('/', auth, admin, getUsers)
router.get('/:id', auth, admin, getUser)
router.put('/profile', auth, updateUserProfile)
router.put('/:id', auth, admin, updateUser)
router.delete('/:id', auth, admin, deleteUser)

export default router
