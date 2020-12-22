import mongoose from 'mongoose'

// Separate it to allow timestaps
const reviewSchema = new mongoose.Schema({
    rating: Number,
    name: String,
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    model: String,
    brand: String,
    image: String,
    price: Number,
    countInStock: {
        type: Number,
        default: 0
    },
    specs: {
        ram: String,
        processor: String,
        vga: String,
        resolution: String,
        storage: {
            hdd: {
                type: String,
                default: null
            },
            ssd: {
                type: String,
                default: null
            },
        },
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product