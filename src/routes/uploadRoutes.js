
import express from 'express'
import multer from 'multer'
import path from 'path'

// Setting-up product image storage
const storage = multer.diskStorage({
    destination: 'public/products',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Create multer instance
const file = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(null, true)
    }
}).single('product')

const router = new express.Router()

// Route handler 
router.post('/', file, (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    res.status(201).send(`${url}/products/${req.file.filename}`)
})

export default router

