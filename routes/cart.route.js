import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import authUser from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.get('/', authUser, getUserCart);
cartRouter.post('/', authUser, addToCart);
cartRouter.put('/', authUser, updateCart);

export default cartRouter;