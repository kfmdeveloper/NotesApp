
const jwt = require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Unathorize Person cannot take action due to High Privacy policy , So Please login!"
            })
        }
        const data = await jwt.verify(token, process.env.SECRET_JSONWEBTOKEN_KEY)
        const userId = data.userId
        req.userId = userId
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = isAuthenticated