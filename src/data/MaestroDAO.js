const Maestro = require('../models/MaestroSchema');  
const jwt = require('jsonwebtoken');

const secretKey = '8190';

// Función para generar un JWT
function generarToken(maestro) {
    const payload = {
        id: maestro.clave,
        nombre: maestro.nombre,
    };
    const opciones = {
        expiresIn: '1h',
    };
    const token = jwt.sign(payload, secretKey, opciones);

    return token;
}

class MaestroDAO{
    static async login(clave, contraseña) {
    try {
        const maestro = await Maestro.findOne({ clave:clave, password:contraseña});

        console.log("Maestro", maestro);

        if (maestro) {
            const token = generarToken(maestro);

            return { maestro, token };
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
}

module.exports = MaestroDAO;