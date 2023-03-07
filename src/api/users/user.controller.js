const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const signUp = async (req, res, next) => {
    try {
        if(req.body.rol === "admin"){   //IMPORTANTE PONER ESTO PARA EVITAR QUE LA GENTE SE PONGA EL ROL ADMIN BY DE FACE
            req.body.rol = "user"
        }
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const userToUpdate = new User(req.body)

        if(req.user.rol !== "admin"){
            userToUpdate.rol = "user"
        }
        const idUser = JSON.stringify(req.user._id)
        const idUserParsed = idUser.slice(1, idUser.length -1)
        //const idUserParsed = idUser.replace(/^"|"$/g, '') FORMA DE HACERLO CON UNA EXPRESIÓN REGULAR
        
        if(req.user.rol === "admin" || idUserParsed === id){
            userToUpdate._id = id
            const userUpdated = await User.findByIdAndUpdate(id, userToUpdate, {new: true})
            return res.json(userUpdated)
        }
        else{
            return res.json("No puedes modificar un usuario que no sea el tuyo, a no ser que seas admin")
        }
    } catch (error) {
        return next(error)
    }
}

// con el req.user de auth.js tengo manera de controlar el rol del usuario, una vez logueado y puedo controlar qué puede hacer
const login = async (req, res, next) => {
    try {
        //debemos comparar lo que le envío con lo que tengo registrado en el bbdd
        // req.body.email es el email del usuario que quiere loguearse
        // req.body.password es la contraseña del usuario que quiere loguearse
        //hago una consulta en la BBDD para encontrar nuestro usuario por email

        const userToLog = await User.findOne({email: req.body.email})

        if(!userToLog){
            return res.status(500).json("No se encuentra el usuario")
        }
        if(bcrypt.compareSync(req.body.password, userToLog.password)){
            //si todo ha ido bien, genero el token
            const token = generateSign(userToLog.id, userToLog.email)
            return res.status(200).json({token, userToLog})
        }
        else{
            return res.status(500).json("Te has equivocado de contraseña")
        }
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    signUp,
    login,
    updateUser
}