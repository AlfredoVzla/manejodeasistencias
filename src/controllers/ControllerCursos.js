const CursoDAO = require('../data/CursosDAO'); 
const HttpStatusCodes= require('../enums/HttpStatusCodes');
require('../data/database');

class ControllerCurso {
    static async agregarCurso(req, res) {
        try {
            const curso = req.body; 
            const resultado = await CursoDAO.agregar(curso);
            res.status(HttpStatusCodes.CREATED).json(resultado);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'No se pudo agregar el curso' });
        }
    }

    static async actualizarCurso(req, res){
        try{
            const resultado= await CursoDAO.actualizar(req.body);
            if(resultado){
                res.status(HttpStatusCodes.OK).json(resultado);
            }else{
                res.status(HttpStatusCodes.NOT_FOUND).json({resultado:'No se ha encontrado el curso que se deseaba actualizar'});
            }
        }catch(error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: 'No se pudo actualizar el curso'});
        }
    }
}

module.exports = ControllerCurso;
