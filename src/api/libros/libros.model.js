//me traigo mongoose porque voy a referenciar a una colección de mi bbdd
const mongoose = require("mongoose")

//creamos el esquema de libros
const libroSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        cover: { type: String },
        category: { type: String, required: true, enum: ["fantasía", "ciencia-ficción", "terror", "humor", "histórica"]},
        price: { type: Number}
    },
    //por separado se ponen las opciones que necesitemos. Por ejemplo timestamps para guardar la fecha de creación y actualización. y la colección
    {
        timestamps: true,
        collection: "libros"
    }
)
//creamos el modelo, se escribe con la inicial en mayúscula para destacar que es más importante. a la hora de pasar la colección, lo hacemos en minúsculas y plural
//también junto a la colección, debemos pasarle el esquema
const Libro = mongoose.model("libros", libroSchema)
//lo exportamos sin llaves
module.exports = Libro