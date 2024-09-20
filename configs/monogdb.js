import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    })
    await mongoose.connect(`${process.env.MONGODB_CONNECT_URI_PRODUCTION}`)
}

export default connectDB