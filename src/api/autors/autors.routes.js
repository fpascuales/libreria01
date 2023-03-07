const { isAdmin } = require("../../middlewares/auth")
const { createAutor, getAutors, deleteAutor } = require("./autors.controller")

const autorRoutes = require("express").Router()

autorRoutes.get("/", getAutors)
autorRoutes.post("/", [isAdmin], createAutor)
autorRoutes.delete("/:idAutor", deleteAutor)

module.exports = autorRoutes