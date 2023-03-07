const express = require("express")

const server = express()

//me traigo la librería dotenv para poder leer las variables que tenga mi .env
require("dotenv").config()

//requiero las CORS para permitir o denegar accesos a mi backend

const cors = require("cors")

//requiero cloudinary para gestionar el tema imágenes

const cloudinary = require("cloudinary").v2

//creo la variable PORT y le doy el valor de la variable PORT que está en mi .env accediendo a ella mediante process.env.NOMBREVARIABLE
//LOS CAMBIOS EN EL .ENV NO LOS CONTROLA NODEMON

const PUERTO = process.env.PORT

//necesito utilizar las CORS para permitir acceso
server.use(cors())

//con

//middlewares para el funcionamiento del body de la petición (para saber interpretarlo)
server.use(express.json())    //esto es para que express me sepa traducir todo lo que le venga de json
server.use(express.urlencoded({extended: true}))    //SE DEBE PONER SI O SI. 

//importo las rutas de mis controladores
const librosRoutes = require("./src/api/libros/libros.routes.js")
const autorsRoutes = require("./src/api/autors/autors.routes.js")
const userRoutes = require("./src/api/users/users.routes.js")
//ruta que usa mi servidor 
server.use("/libros", librosRoutes)
server.use("/autores", autorsRoutes)
server.use("/usuarios", userRoutes)


//me traigo mi BBDD
const db = require("./src/utils/db.js")

//configuración de cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//estoy ejecuando la función connectDB de mi archivo db.js
db.connectDB()

//El controlador de errores recibe 4 parámetros, err -> error, req -> petición, res -> respuesta, next -> pasar a lo siguiente
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Error inesperado")
})
server.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
})

//función que ejecuta mi server para utilziar una ruta para mostrar algo o enrutar de otra manera
server.use("/", (req, res) => {
    res.send("Funcionando")
})

//poner el server a escuchar con un puerto y su arrow function
server.listen(PUERTO, () => {
    console.log("Server funcionando en http://localhost:" + PUERTO);
})