const { isAuth } = require("../../middlewares/auth")
const { signUp, login, updateUser } = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/", signUp)
userRoutes.post("/login", login)
userRoutes.post("/:id", [isAuth], updateUser)
module.exports = userRoutes