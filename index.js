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

app.use(cors());
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