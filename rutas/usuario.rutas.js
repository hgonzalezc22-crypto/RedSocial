const express = require("express");
const router = express.Router();

//CREAR ARTICULO-----------------------------------------------------

// Importamos el controlador
const UsuarioController = require("../controladores/usuarios.controlador");

//Rutas
router.post("/usuario-crear", UsuarioController.crear_normal);
router.post("/usuario-buscar", UsuarioController.buscarUno);

//Exportamos el enrutador para registrarlo en index.js
module.exports = router;