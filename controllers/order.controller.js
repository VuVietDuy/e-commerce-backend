import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";


const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const order = new Order(orderData)
        await order.save();
        await User.findByIdAndUpdate(userId, { cartData: {} })

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message,
        })
    }
}

const placeOrderStripe = async (req, res) => {

}

const placeOrderRazorpay = async (req, res) => {

}

const getUserOrderHistory = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await Order.find({ userId })
        res.status(200).json({
            success: true,
            message: "Order history fetched successfully",
            orders,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// admin panel
// get user order history admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// update order status from admin
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log(orderId);
        await Order.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Order status updated successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    getUserOrderHistory,
    getOrders,
    updateOrderStatus,
}
