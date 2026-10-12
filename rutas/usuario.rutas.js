const express = require("express");
const router = express.Router();
const authMiddle = require("../middleware/auth"); 

//Rutas usuariosx
const UsuarioController = require("../controladores/usuarios.controlador");
router.post("/usuario-crear", UsuarioController.crear_normal);
//router.post("/usuario-buscar", UsuarioController.buscarUno);
router.post("/usuario-login", UsuarioController.login);
router.get("/usuario-perfil", authMiddle.auth, UsuarioController.perfil); //protegida

module.exports = router;