import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({
                success: false,
                message: "Token not provided"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }
        next()
    } catch (error) {
        res.json({
            success: false,
            message: "Token expired"
        })
    }
}

export default adminAuth;