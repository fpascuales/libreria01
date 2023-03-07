const { isAdmin } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")
const { getAllLibros, getLibrosById, getLibrosByTitle, createLibros, deleteLibro, deleteLibroByTitle, updateLibro } = require("./libros.controller")

//las rutas no pueden funcionar sin controladores. me traigo el router de express para poder gestionar mis rutas
const librosRoutes = require("express").Router()

//que cuando estemos en raiz, pille todos los libros. Aquí llegamos gracias al index.js utilizando el servidor para declarar la ruta principal que gestiona al resto de rutas que ya tenemos
librosRoutes.get("/", getAllLibros)
//declaro la ruta para que use el controlador que pilla los libros por id
librosRoutes.get("/:id", getLibrosById)        //le meto el [isAuth] para controlar que solo los autorizados puedan ver libros por id
//declaro la ruta para que use el controlador que pilla los libros por título
librosRoutes.get("/getByTitle/:title", getLibrosByTitle)
//declaro la ruta para que use el controlador que crea el nuevo libro
librosRoutes.post("/", [isAdmin], upload.single("cover"), createLibros)
//declaro la ruta para que use el controlador que elimina libros
librosRoutes.delete("/:idLibro", [isAdmin], deleteLibro)        //le meto el [isAuth] para controlar que solo los autorizados puedan eliminar libros
//declaro la ruta para que use el controlador que elimina libros por título
librosRoutes.delete("/deleteByTitle/:titleLibro", [isAdmin], deleteLibroByTitle)
//declaro la ruta para que use el controlador que actualizará el libro
librosRoutes.put("/:idLibro", [isAdmin], updateLibro)
//exportamos las rutas para que puedan ser utilizadas en el index.js
module.exports = librosRoutes