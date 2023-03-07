const Autor = require("./autors.model")

const createAutor = async (req, res, next) => {
    try {
        const newAutor = await new Autor(req.body)
        await newAutor.save()
        return res.json(newAutor)
    } catch (error) {
        return next(error)
    }
}
const getAutors =  async (req, res, next) => {
    try {                           //el books que está dentro del populate, hace referencia al campo del modelo que quiero popular. NOMBRE DE LA CLAVE DECLARADA EN EL MODELO AUTORES
        const autors = await Autor.find().populate("books")    //(que va a buscar los datos de los libros que tengan los id que tenemos en el array de libros)
        //si queremos "popular" los datos que están dentro de los libros, haríamos lo siguiente
        /*
            .find().populate({path: "libros", populate: {path: "dato"}})

        */
        //si quisiéramos traernos los datos de los libros y los datos de las editoriales, de los autores y, están al mismo nivel (un autor tiene libros y trabaja con editoriales)
        /*
            .find().populate("libros").populate("editoriales")
            .find().populate("libros editoriales")  ->probar si esta funciona
        */
        return res.json(autors)
    } catch (error) {
        return next(error)
    }
}
const deleteAutor = async (req, res, next) => {
    try {
        const { idAutor } = req.params
        const autorEliminado = await Autor.findByIdAndDelete(idAutor)
        return res.status(202).json(autorEliminado)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createAutor,
    getAutors,
    deleteAutor
}