import 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import User from './models/userModel.js'
import Product from './models/productModel.js'
import users from './data/users.js';
import products from './data/products.js';

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => ({ ...product, user: adminUser }))

        await Product.insertMany(sampleProducts)

        console.log("Data Imported!".green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.bold);
        process.exit(1) // Exit with failure
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        await console.log("Data destroyed!".red.inverse);
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.bold)
        process.exit(1)
    }
}

if (process.argv[2] === '-d')
    destroyData()
else
    importData()
