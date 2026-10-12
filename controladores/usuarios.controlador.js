const Usuario = require("../modelos/usuario.modelo");
const bcrypt = require('bcrypt'); //para encriptar contrasenias
const tokenServ = require("../servicios/jwt.servicio")

const crear_normal = async (req, res) => {
    console.log("Cuerpo recibido:", req.body);
    const { username, contrasenia, correo } = req.body;

    try {
        // 1. Encriptar la contraseña (10 rondas de salting es el estándar recomendado)
        const saltRounds = 10;
        const contraseniaHash = await bcrypt.hash(contrasenia, saltRounds);

        // 2. Crear el documento usando la contraseña encriptada
        const nuevoUsuario = new Usuario({
            username,
            correo,
            contrasenia: contraseniaHash,
            fecha_creacion: new Date() // Inyección de la fecha actual del sistema
        });

        await nuevoUsuario.save();

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito'});

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const crear_mod = async (req, res) => {

}

//el editar no debe alterar la variable si es moderador
const editar = async (req, res) => {

}

//solo hace flip al bit de mod
const volver_mod = async(req, res) => {

}

const borrar = async(req, res) => {

}
const buscarUno = async(req, res) => {
    const { username, contrasenia } = req.body;

    if (!username || !contrasenia) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
    }

    try {
        // 1. Buscar al usuario únicamente por su nombre de usuario (o correo)
        const usuarioEncontrado = await Usuario.findOne({ username: username });

        if (!usuarioEncontrado) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        // 2. Comparar la contraseña recibida con el hash almacenado en la BD
        const esCorrecta = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!esCorrecta) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        // 3. Inicio de sesión exitoso
        return res.status(200).json({
            mensaje: 'Autenticación exitosa',
            usuario: {
                id: usuarioEncontrado._id,
                username: usuarioEncontrado.username
            }
        });

    } catch (error) {
        console.error('Error al consultar MongoDB:', error);
        return res.status(500).json({ error: 'Error al procesar la solicitud en el servidor.' });
    }
}

const login = async(req, res) => {
    const { username, contrasenia } = req.body;

    try {
        const usuarioEncontrado = await Usuario.findOne({ username: username });
        if (!usuarioEncontrado) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const esCorrecta = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);
        if (!esCorrecta) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // 2. Generar token delegando la lógica al servicio
        const token = tokenServ.createToken(usuarioEncontrado);

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token
        });

    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ error: 'Error al procesar el login' });
    }
}

const perfil = async(req, res) => {

}


//PARA SUBIR IMAGENES-----------------------------------------------------------------------
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Configuración de Multer (Se declara fuera de la función)
// ==========================================
// Configuración de Multer
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        const rutaUploads = './uploads/';

        // Si la carpeta no existe, Node.js la crea automáticamente
        if (!fs.existsSync(rutaUploads)) {
            fs.mkdirSync(rutaUploads, { recursive: true });
        }

        cb(null, rutaUploads);
    },
    filename: (req, file, cb) => {
        cb(null, "articulo_" + Date.now() + path.extname(file.originalname));
    }
});

// Inicializamos multer con la configuración anterior, esperando un campo llamado 'imagen' (form-data)
const subidas = multer({ storage: almacenamiento });

// ==========================================
// 2. Controlador principal
// ==========================================
const subir = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({
                status: "error",
                mensaje: "Petición inválida, no se ha enviado ninguna imagen"
            });
        }

        const extension = req.file.originalname.split(".").pop().toLowerCase();

        if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
            await fs.promises.unlink(req.file.path);
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen inválida"
            });
        }

        const articuloId = req.params.id;
        const articuloActualizado = await Articulo.findByIdAndUpdate(
            articuloId,
            { imgUrl: req.file.filename },
            { new: true }
        );

        if (!articuloActualizado) {
            await fs.promises.unlink(req.file.path);
            return res.status(404).json({
                status: "error",
                mensaje: "El artículo no existe"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
};

module.exports = {
    crear_normal,
    crear_mod,
    editar,
    borrar,
    volver_mod,
    buscarUno,
    login,
    perfil
};