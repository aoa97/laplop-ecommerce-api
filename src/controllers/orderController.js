import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Add a new order
// @route   POST /api/orders
// @access  Private
const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems = [],
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if (orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).send(createdOrder)
})

// @desc    Get an order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email') // Populate some user fileds to user object

    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }

    res.send(order)
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    } else {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = { // Came from PayPal API [If other payment gateway => other info will be added]
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.send(updatedOrder)
    }
})

// @desc    Update order to deliverd
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    } else {

        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.send(updatedOrder)
    }
})

// @desc    Get user's orders
// @route   GET /api/orders/myOrders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'id name')
    res.send(orders)
})

// @desc    Get all users' orders
// @route   GET /api/orders
// @access  Private/Admin
const getAdminOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.send(orders)
})


export {
    addOrder,
    getOrderById,
    updateOrderToPaid,
    getUserOrders,
    getAdminOrders,
    updateOrderToDelivered
}