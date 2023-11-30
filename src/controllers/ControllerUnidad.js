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

    static async actualizarUnidad(req, res){
        try{
            const resultado= await UnidadDAO.actualizar(req.body);
            if(resultado){
                res.status(HttpStatusCodes.OK).json(resultado);
            }else{
                res.status(HttpStatusCodes.NOT_FOUND).json({resultado:'No se ha encontrado la unidad que se deseaba actualizar'});
            }
        }catch(error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: 'No se pudo actualizar la unidad'});
        }
    }

    static async eliminarUnidad(req, res) {
        try {
            const clave = req.headers.clave;
            const resultado = await UnidadDAO.eliminar(clave);
            if (resultado) {
                res.status(HttpStatusCodes.OK).json({ mensaje: 'Se ha eliminado correctamente', resultado });
            } else {
                res.status(HttpStatusCodes.NOT_FOUND).json({ resultado: 'No se ha encontrado la unidad que se deseaba eliminar' });
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'No se pudo eliminar la unidad' });
        }
    }
}

module.exports = ControllerUnidad;