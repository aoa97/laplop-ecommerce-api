import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold);
    } catch (e) {
        console.error(`Error: ${e.message}`.red.underline.bold)
    }
}

export default connectDB