import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const productsPerPage = 10
    const page = Number(req.query.pageNumber) || 1

    const regex = new RegExp(req.query.keyword, 'i')
    const filter = req.query.keyword ? { $and: [{ $or: [{ brand: regex }, { model: regex }] }] } : {}

    const count = await Product.countDocuments({ ...filter })
    const products = await Product.find({ ...filter }).limit(productsPerPage).skip(productsPerPage * (page - 1))

    res.send({
        products,
        page,
        pages: Math.ceil(count / productsPerPage)
    })
})

// @desc    Fetch top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ totalRating: -1 }).limit(3)

    res.send(products)
})

// @desc    Fetch a single product by id
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }

    res.send(product)
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.send({ message: "Product has been removed" })
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// @desc    Update a product  
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    product.brand = req.body.brand || product.brand
    product.model = req.body.model || product.model
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.countInStock = req.body.countInStock
    product.specs = {
        processor: req.body.specs.processor || product.specs.processor,
        ram: req.body.specs.ram || product.specs.ram,
        vga: req.body.specs.vga || product.specs.vga,
        resolution: req.body.specs.resolution || product.specs.resolution,
        storage: {
            hdd: req.body.specs.storage.hdd,
            ssd: req.body.specs.storage.ssd
        }
    }

    const updatedProduct = await product.save()

    res.send({
        _id: product._id,
        brand: updatedProduct.brand,
        model: updatedProduct.model,
        price: updatedProduct.price,
        image: updatedProduct.image,
        countInStock: updatedProduct.countInStock,
        specs: {
            processor: updatedProduct.specs.processor,
            ram: updatedProduct.specs.ram,
            vga: updatedProduct.specs.vga,
            resolution: updatedProduct.specs.resolution,
            storage: {
                hdd: updatedProduct.specs.storage.hdd,
                ssd: updatedProduct.specs.storage.ssd
            }
        }
    })
})

// @desc    Create a product  
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        image: req.body.image,
        countInStock: req.body.countInStock,
        specs: {
            ram: req.body.ram,
            processor: req.body.processor,
            vga: req.body.vga,
            resolution: req.body.resolution,
            storage: {
                hdd: req.body.hdd,
                ssd: req.body.ssd,
            }
        }
    })

    const createdProduct = await product.save()
    res.status(201).send(createdProduct)
})

// @desc    Create a review  
// @route   POST /api/products/:id/review
// @access  Private
const createReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id)

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.totalRating = product.reviews.reduce((a, x) => a + x.rating, 0) / product.reviews.length

        await product.save()
        res.status(201).send({ message: 'Review added ' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getTopProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createReview
}