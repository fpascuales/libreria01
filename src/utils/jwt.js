const jwt = require("jsonwebtoken")

//para generar tokens y comprobarlos necesitamos una variable secreta de la que partir para generar el token

const generateSign = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '30d'}) //sign necesita el objeto con los parámetros que queremos controlar para el token, la variable creada en .env y el tiempo de expiración (30d = 30 días)
}

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = {
    generateSign,
    verifyJwt
}