import 'colors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config()
connectDB()

const app = express()
const __dirname = path.resolve()


// Logger on firing a request
if (process.env.NODE_ENV === 'dev')
    app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public'))); // Mark folder as static folder
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold);
})

