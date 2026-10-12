const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    nombre: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    contrasenia: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true,
    },
    biografia: {
      type: String,
      required: false
    },
    pfpUrl: {
      type: String,
      default: 'pfp_default.png'
    },
    es_mod: { 
      type: Boolean, 
      default: false
    },
    fecha_creacion: {
      type: Date,
      required: true
    },
})


// Exportamos el modelo vinculándolo a la colección 'articles'
// Parámetros: Nombre del modelo, Esquema, Nombre exacto de la colección en MongoDB
module.exports = model("Usuario", UsuarioSchema, "usuarios"); //cambiar el nombre de la coleccion destino en la 3ra coma