const UnidadDAO = require('../data/UnidadDAO'); 
const HttpStatusCodes= require('../enums/HttpStatusCodes')
require('../data/database');

class ControllerUnidad {
    static async agregarUnidad(req, res) {
        try {
            const resultado = await UnidadDAO.agregar(req.body);
            res.status(HttpStatusCodes.OK).json(resultado);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'No se pudo agregar la unidad' });
        }
    }
}

module.exports = ControllerUnidad;