import express from 'express';
import { getOrders, getUserOrderHistory, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrderStatus } from '../controllers/order.controller.js';
import authUser from '../middlewares/auth.js';
import adminAuth from '../middlewares/adminAuth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.get('/list', adminAuth, getOrders)
orderRouter.put('/status', adminAuth, updateOrderStatus)

// Payment
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User features
orderRouter.get('/userorder', authUser, getUserOrderHistory)


export default orderRouter;
