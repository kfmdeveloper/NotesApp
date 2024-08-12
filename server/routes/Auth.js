const { Register, Login, Logout } = require("../controllers/userController")

const express = require("express")

const AuthRouter = express.Router()

AuthRouter.post("/register", Register)
AuthRouter.post("/login", Login)
AuthRouter.get("/logout", Logout)

module.exports = AuthRouter