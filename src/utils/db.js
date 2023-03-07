//La libreria que vamos a utilizar para cualquier cosa que tenga que ver aunque sea mínimanente con la BBDD será Mongoose
//este archivo es el que conecta con la BBDD mediante la siguiente función

//me traigo la librería mongoose, para eso necesito instalarla con npm i mongoose
const mongoose = require("mongoose")

//creo una variable para guardar el link a la BBDD para poder conectar
const LINK_A_MI_BBDD = process.env.DB_URL

//creo la función connectDB
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true)
        const db = await mongoose.connect(LINK_A_MI_BBDD)
        //hago destructuring de db.connection y pillo la propiedad connection de db
        const { host } = db.connection
        console.log("conectado con éxito");
    } catch (error) {
        console.log(`No me puedo conectar a la BBDD comprueba el error este: ${error}`);
    }
}
//exportamos la función coneccDB
module.exports = { connectDB }