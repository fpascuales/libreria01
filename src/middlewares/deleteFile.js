const cloudinary = require("cloudinary").v2

const deleteFile = (imgUrl) => {
    
    const imgSplitted = imgUrl.split("/")
    const nameSplitted = imgSplitted.at(-1).split(".")  //la función de JS .at nos devuelve el valor que le pasemos. Ej: -1 nos devuelve el último
    const folderSplitted = imgSplitted.at(-2)
    const public_id = `${folderSplitted}/${nameSplitted[0]}`
    cloudinary.uploader.destroy(public_id, () => {
        console.log("SE HA ELIMINADO CORRECTAMENTE");
    })
}

module.exports = {deleteFile}
