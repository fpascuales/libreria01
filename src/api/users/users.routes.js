const { isAdmin } = require("../../middlewares/auth")
const { signUp, login, updateUser } = require("./user.controller")

const userRoutes = require("express").Router()

userRoutes.post("/", signUp)
userRoutes.post("/login", login)
userRoutes.post("/:id", [isAdmin], updateUser)
module.exports = userRoutes