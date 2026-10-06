const Usuario = require("../modelos/usuario.modelo");

const crear_normal = async (req, res) => {
    console.log("Cuerpo recibido:", req.body);
    const {username, contrasenia, correo} = req.body; //en postman hay que agregar un header de Content-Type: application/json

        try {
            // 2. Instanciar el objeto del artículo con la fecha autogenerada en el servidor
            const nuevoUsuario = new Usuario({
                username: username,
                contrasenia: contrasenia,
                correo: correo,
                fecha_creacion: new Date() // Inyección de la fecha actual del sistema
            });
    
            // 3. Guardar el documento en MongoDB de forma asíncrona
            const usuarioGuardado = await nuevoUsuario.save();
    
            // 4. Retornar respuesta de éxito (Código HTTP 201: Creado)
            return res.status(201).json({
                status: "success",
                mensaje: "Usuario no moderador insertado correctamente",
                usuario: usuarioGuardado
            });
    
        } catch (error) {
            // Manejo de errores internos del servidor (Código HTTP 500)
            return res.status(500).json({
                status: "error",
                mensaje: "Error al insertar el usuario",
                error: error.message
            });
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

        // Validar que se envíen ambos campos
        if (!username || !contrasenia) {
            return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
        }

        try {
            // Consultar la base de datos
            const usuarioEncontrado = await Usuario.findOne({ username, contrasenia });

            // Si no existe ninguna coincidencia
            if (!usuarioEncontrado) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            // Si los datos coinciden
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

module.exports = {
    crear_normal,
    crear_mod,
    editar,
    borrar,
    volver_mod,
    buscarUno
};