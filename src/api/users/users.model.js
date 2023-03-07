const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true, trim: true},
        favoriteBooks: [{type: mongoose.Types.ObjectId, ref: "libros"}],
        rol: {type: String, default: "user", },
        age: {type: Number}
    },
    {
        timestamps: true,
        collection: "usuarios"
    }
)
//antes(pre) de guardar (save) la contraseña, le paso el bcrypt
//NO USES ARROW FUNCTION PARA HACER ESTO, IMBECIL!!
userSchema.pre("save", function (next){
    this.password = bcrypt.hashSync(this.password, 10) //el 10 es el número de vueltas (encriptación) que hará bcrypt para encriptar la contraseña. 10 ya es un valor seguro)
    next()
})

const User = mongoose.model("usuarios", userSchema)
module.exports = User
