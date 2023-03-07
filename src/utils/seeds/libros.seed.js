//me traigo mongoose
const mongoose = require("mongoose")

//importamos el modelo Libro para poder utilizar el Schema
const Libro = require("../../api/libros/libros.model")

require("dotenv").config()
const DB_URL = process.env.DB_URL

const libros = [
    {
        title: "Titanic",
        cover: "https://m.media-amazon.com/images/I/418roRnnehL.jpg",
        category: "histórica",
        price: 37
    },
    {
        title: "El Silmarillion",
        cover: "https://m.media-amazon.com/images/I/81Rrs4kyALL.jpg",
        category: "fantasía",
        price: 27
    },
    {
        title: "El Quijote",
        cover: "https://www.rae.es/sites/default/files/imagenes/articulos/Don_Quijote_de_la_Mancha_1_0.jpg",
        category: "fantasía",
        price: 32
    }
]

//me conecto a la BBDD sin hacer uso directo de db.connect()
//ahora buscaré en todos los libros
mongoose.connect(DB_URL).then(async () => {
    //me creo una variable para traérme todos los libros que tenga, que haya buscado.
    //el .find es el del mongo, que se lo hago a un modelo. devuelve un array
    const libros = await Libro.find()
    //compruebo que hay libros
    if(libros.length){
        //recojo la colección de mi modelo Libro y elimino los datos que haya en ella
        await Libro.collection.drop()
        console.log("LIBROS ELIMINADOS CON ÉXITO");
    }

}).catch((error) => console.log("Error borrando los datos de la bbdd", error))  //pongo el catch por si falla la petición
.then(async () => {
    await Libro.insertMany(libros)  //inserto los libros a la bbdd
    console.log("LIBROS CREADOS CON ÉXITO");
})
.catch((error) => console.log("Error insertando los libros en la bbdd", error)) //compruebo si falla la inserción
.finally(() => mongoose.disconnect())   //una vez termino todos los procesos, me desconecto de la bbdd