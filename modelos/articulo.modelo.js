const { Schema, model } = require("mongoose");

// Definición del esquema flexible (acepta cualquier campo sin restricciones)
const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imgUrl: {
        type: String,
        required: false
    },
    
})

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    biografia: {
        type: String,
        required: false
    },
    pfpUrl: {
        type: String,
        required: false
    },
    es_mod: { 
        type: Boolean, 
        required: true 
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
})

const PublicacionSchema = Schema({
    id_usuario: {
        type: String,
        required: true
    },
    UrlImagen: {
        type: String,
        required: false
    },
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
})

const ComentarioSchema = Schema({
    id_publicacion: {
        type: String,
        required: true
    },
    UrlImagen: {
        type: String,
        required: false
    },
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
})

// Exportamos el modelo vinculándolo a la colección 'articles'
// Parámetros: Nombre del modelo, Esquema, Nombre exacto de la colección en MongoDB
module.exports = model("Articulo", ArticuloSchema, "articulos"); //cambiar el nombre de la coleccion destino en la 3ra coma