import express from 'express'
import { auth, admin } from '../middlewares/authMiddleware.js'
import { createProduct, createReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js'

const router = new express.Router()

// Handlers
router.get('/', getProducts)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
router.delete('/:id', auth, admin, deleteProduct)
router.put('/:id', auth, admin, updateProduct)
router.post('/', auth, admin, createProduct)
router.post('/:id/review', auth, createReview)


export default router