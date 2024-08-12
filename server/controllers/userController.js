const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register User

const Register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const ExistUser = await User.findOne({ email })
        if (ExistUser) {
            return res.status(303).json({
                success: false,
                message: "user already exists please login!"
            })
        }

        //Hashing password by salt

        const HashedPassword = await bcrypt.hash(password, 10)

        const user = await new User({
            name, email, password: HashedPassword
        })
        await user.save()
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//Logged in User

const Login = async (req, res) => {


    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        //Checking existing user

        const existsUser = await User.findOne({ email })
        if (!existsUser) {
            return res.status(404).json({
                success: false,
                message: "invalid logins,try again"
            })
        }

        //Matching the Password of the User

        const MatchPassword = await bcrypt.compare(password, existsUser.password)
        if (!MatchPassword) {
            return res.status(404).json({
                success: false,
                message: "invalid logins,try again"
            })
        }

        //Making sessions
        const data = {
            userId: existsUser._id
        }

        const token = await jwt.sign(data, process.env.SECRET_JSONWEBTOKEN_KEY, { expiresIn: "3d" })
        res.cookie("token", token).status(200).json({
            success: true,
            message: `${existsUser.name} welcome back!`,
            user: existsUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Logging Out User

const Logout = async (req, res) => {

    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({
                message: "Unathorized user cannot take actions!"
            })
        }

        const data = await jwt.verify(token, process.env.SECRET_JSONWEBTOKEN_KEY)
        const LoggedUser = await User.findById(data.userId)

        res.cookie("token", "").json({
            success: true,
            message: `Logged Out... GoodBye ${LoggedUser.name}, See you again!`
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { Register, Login, Logout }