const asistenciasDAO = require('../data/AsistenciasDAO')
require('../data/database');

class ControllerConsulta {
    static async asistenciasAlumno(req, res) {
        try{
            console.log(req.body.grupo+", "+req.body.alumno)
            const consulta= await asistenciasDAO.consultarAsistenciasAlumno(req.body.grupo, req.body.alumno);
            res.status(201).json(consulta);
        } catch (err) {
            console.error(err)
            res.status(500).json({error: "No se pudieron recuperar las asistencias"})
        }
    }

    static async asistenciasGrupo(req, res) {
        try{
            const consulta= await asistenciasDAO.consultarPorGrupo(req.body.grupo, req.body.desde, req.body.hasta)
            res.status(201).json(consulta);
        } catch (err) {
            console.error(err)
            res.status(500).json({error: "No se pudieron recuperar las asistencias"})
        }
    }
}

module.exports = ControllerConsulta;