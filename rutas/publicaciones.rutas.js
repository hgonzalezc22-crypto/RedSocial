const express = require("express");
const router2 = express.Router();

//CREAR ARTICULO-----------------------------------------------------

// Importamos el controlador
const PublicacionController = require("../controladores/publicaciones.controlador");
const ArticuloController = require("../controladores/articulos.controlador");


//Rutas
router2.post("/publicacion-crear", PublicacionController.crear);
router2.put("/publicacion-editar/:id", PublicacionController.editar);   //Ruta para editar por ID
router2.delete("/publicacion-borrar/:id", PublicacionController.borrar)
router2.post("/subir-imagen/:id", ArticuloController.subidas.single("file0"),ArticuloController.subir);


//Exportamos el enrutador para registrarlo en index.js
module.exports = router2;