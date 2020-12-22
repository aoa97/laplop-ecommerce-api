import express from 'express'
import { admin, auth } from '../middlewares/authMiddleware.js'
import { addOrder, getAdminOrders, getOrderById, getUserOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'

const router = new express.Router()

// End-points
router.post('/', auth, addOrder)
router.get('/', auth, admin, getAdminOrders)
router.get('/myOrders', auth, getUserOrders)
router.get('/:id', auth, getOrderById)
router.put('/:id/pay', auth, updateOrderToPaid)
router.put('/:id/deliver', auth, admin, updateOrderToDelivered)

export default router