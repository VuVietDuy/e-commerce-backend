import { User } from "../models/user.model.js"


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        const cartData = await userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = { [size]: 1 }
        }

        await User.findByIdAndUpdate(userId, { cartData: cartData })
        res.json({
            success: true,
            message: 'Product added to cart',
            cartData,
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to add to cart',
            error: error.message,
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        const cartData = userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] = quantity
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Size not found in the cart',
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Product not found in the cart',
            })
        }

        await User.findByIdAndUpdate(userId, { cartData: cartData })
        res.json({
            success: true,
            message: 'Cart updated successfully',
            cartData,
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to update cart',
            error: error.message,
        })
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        const cartData = await userData.cartData

        res.json({
            success: true,
            message: 'Cart fetched successfully',
            cartData,
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}

export {
    addToCart,
    updateCart,
    getUserCart,
}