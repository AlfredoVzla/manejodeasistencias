const CursoDAO = require('../data/CursosDAO'); 
require('../data/database');

class ControllerCurso {
    static async agregarCurso(req, res) {
        try {
            const curso = req.body; 
            const resultado = await CursoDAO.agregar(curso);
            res.status(201).json(resultado);
        } catch (err) {
            res.status(500).json({ error: 'No se pudo agregar el curso' });
        }
    }

   
}

module.exports = ControllerCurso;
