const mongoose = require("mongoose");

const conexion = async () => {
    try {
        // Conexión usando el puerto estándar de MongoDB (27017)
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Conectado correctamente a la base de datos pagina_web");
    } catch (error) {
        console.error("Error de conexión:", error.message);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}
