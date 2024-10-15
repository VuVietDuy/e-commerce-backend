import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './configs/monogdb.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';


connectDB()
connectCloudinary()
const app = express();

const corsOptions = {
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://e-commerce-forever.vercel.app', 'https://e-commerce-forever-admin.vercel.app'],
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 8000

// Get all products
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})