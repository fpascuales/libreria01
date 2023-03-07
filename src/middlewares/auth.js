const User = require("../api/users/users.model")
const { verifyJwt } = require("../utils/jwt")

const isAuth = async (req, res, next) => {
    try {
        //recogemos la autorización de los headers de la petición
        const token = req.headers.authorization
        //si no tiene ese campo, no está logueado y no le dejo pasar
        if(!token){
            return res.json("No estás autorizado")
        }
        //si tiene token, comprobamos si es válido, necesitamos sólo el token, pero tenemos que quitarle el "Bearer " generado en la autorización
        const parsedToken = token.replace("Bearer ", "")
        //verificamos si el token es correcto. Es decir, si es la llave que he creado
        const validToken = verifyJwt(parsedToken)
        //comprobamos el usuario en la BBDD
        const userLoged = await User.findById(validToken.id)

        userLoged.password = null //no me interesa enseñar la contraseña
        req.user = userLoged
        next()
    } catch (error) {
        return res.json(error)
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token){
            return res.json("No estás autorizado")
        }
        const parsedToken = token.replace("Bearer ", "")
        const validToken = verifyJwt(parsedToken)
        const userLoged = await User.findById(validToken.id)

        //comprobamos si el rol del usuario que me ha puesto la autorización en los headers es un admin
        if(userLoged.rol === "admin"){
            userLoged.password = null //no me interesa enseñar la contraseña
            req.user = userLoged
            next()
        }
        else{
            return res.json("No eres admin, largo!")
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports = {
    isAuth,
    isAdmin
}