//puedo declarar los controladores, sin tener la información de la ruta
//no nos traemos mongoose, porque el Schema ya lo tiene
//me traigo el Schema para saber si tengo libros
const { deleteFile } = require("../../middlewares/deleteFile")
const Libro = require("./libros.model")

//todos los controladores que creemos tendrán un try catch
const getAllLibros = async (req, res, next) => {
    try {
        const libros = await Libro.find()   //intento traer de mi bbdd todos los libros
        return res.json(libros)
    } catch (error) {
        return next(error)
    }
}
const getLibrosById = async (req, res, next) => {
    try {
        const { id } = req.params //hago object destructuring y me quedo con el id del libro
        const libro = await Libro.findById(id)
        if(!libro){
            return res.json("No he podido encontrar el libro, ese id no existe")
        }
        return res.json(libro)
    } catch (error) {
        return next(error)
    }
}
const getLibrosByTitle = async (req, res, next) => {
    try {
        const { title } = req.params //hago destructuring para pillar el título del libro
        const libro = await Libro.findOne({title: title})   //el primer title es la propiedad y el segundo, la variable
        if(!libro){
            return res.json("No he podido encontrar el libro, ese id no existe")
        }
        return res.json(libro)
    } catch (error) {
        return next(error)
    }
}
const createLibros = async (req, res, next) => {
    try {
        const newLibro = await new Libro(req.body)

        if(req.file){
            newLibro.cover = req.file.path
        }
        await newLibro.save()
        return res.json(newLibro)
    } catch (error) {
        return next(error)
    }
}
const deleteLibro = async (req, res, next) => {
    try {
        const { idLibro } = req.params
        const libroEliminado = await Libro.findByIdAndDelete(idLibro)
        return res.status(202).json(libroEliminado)
    } catch (error) {
        return next(error)
    }
}
const deleteLibroByTitle = async (req, res, next) => {
    try {
        const { titleLibro } = req.params
        const libroEliminado = await Libro.findOneAndDelete({title: titleLibro})
        return res.status(202).json(libroEliminado)
    } catch (error) {
        return next(error)
    }
}
const updateLibro = async (req, res, next) => {
    try {
        const { idLibro } = req.params
        // const libroToUpdate = new Libro(req.body)
        // libroToUpdate._id = idLibro
        if(req.file){
            const oldLibro = await Libro.findById(id)
            if(oldLibro.cover){
                deleteFile(oldLibro.cover)
            }
            req.body.cover = req.file.cover
        }

        const libroUpdated = await Libro.findByIdAndUpdate(idLibro, req.body, {new:true}) //el {new:true} es para que me devuelta el libro ya actualizado
        return res.status(202).json(libroUpdated)
    } catch (error) {
        return next(error)
    }
}
//exportamos todas las funciones creadas
module.exports = {
    getAllLibros,
    getLibrosById,
    getLibrosByTitle,
    createLibros,
    deleteLibro,
    deleteLibroByTitle,
    updateLibro
}