const asistenciasDAO = require('../data/AsistenciasDAO')
const HttpStatusCodes= require('../enums/HttpStatusCodes')
require('../data/database');

class ControllerConsulta {
    static async asistenciasAlumno(req, res) {
        try{
            console.log(req.body.grupo+", "+req.body.alumno)
            const consulta= await asistenciasDAO.consultarAsistenciasAlumno(req.body.grupo, req.body.alumno);
            console.log(HttpStatusCodes.OK);
            res.status(HttpStatusCodes.OK).json(consulta);
        } catch (err) {
            console.error(err)
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "No se pudieron recuperar las asistencias"})
        }
    }

    static async asistenciasGrupo(req, res) {
        try{
            const consulta= await asistenciasDAO.consultarPorGrupo(req.body.grupo, req.body.desde, req.body.hasta)
            console.log(HttpStatusCodes.OK);
            res.status(HttpStatusCodes.OK).json(consulta);
        } catch (err) {
            console.error(err)
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "No se pudieron recuperar las asistencias"})
        }
    }
}

module.exports = ControllerConsulta;