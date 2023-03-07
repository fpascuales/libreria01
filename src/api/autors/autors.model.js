const mongoose = require("mongoose")

const autorSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        age: {type: Number, required: true},
        photo: {type: String, required: true},
        category: { type: String, required: true, enum: ["fantasía", "ciencia-ficción", "terror", "humor", "histórica"]},
        books: [{type: mongoose.Types.ObjectId, ref: "libros"}]
    },
    {
        timestamps: true,
        collection: "autores"
    }
)
const Autor = mongoose.model("autores", autorSchema)
module.exports = Autor