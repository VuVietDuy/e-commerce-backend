import { User } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = createToken(user._id)
        res.json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ name, email, password: hashedPassword })
        await user.save()
        const token = createToken(user._id)
        res.json({
            success: true,
            message: "User registered successfully",
            token: token,
            user: user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.json({
                success: true,
                message: "Admin logged in successfully",
                token: token
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const logout = async () => {

}

export { loginUser, registerUser, adminLogin, logout }

