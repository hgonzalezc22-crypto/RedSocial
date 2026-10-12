//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta
const claveSecreta = process.env.JWT_SECRET;

//Crear una función para generar token
const createToken = (user) =>{
    const payload = {
        id: user._id,
        username: user.username,
        nombre: user.nombre,
        correo: user.correo,
        es_mod: user.es_mod,
        pfpUrl: user.pfpUrl,
        fecha_creacion: user.fecha_creacion,
        biografia: user.biografia,
        iat: moment().unix(),
        exp: moment().add(30,"days").unix()
    };
    //Devolver un JWT token codificado
    return jwt.encode(payload, claveSecreta);
}


module.exports = {
    claveSecreta,
    createToken
}