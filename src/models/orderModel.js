import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        qty: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    }],
    shippingAddress: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    },
    itemsPrice: {
        type: Number,
        default: 0,
    },
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    paidAt: Date,
    deliveredAt: Date,
    paymentMethod: {
        type: String,
    },
    paymentResult: {
        id: String,
        status: String,
        email_address: String
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order