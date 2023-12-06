const Curso = require('../models/CursoSchema');  

class CursoDAO {
    static async agregar(curso) {
        try {
            const resultado = await Curso.create(curso); 
            return resultado;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async actualizar(curso){
        try{
            var resultado= await Curso.findOneAndUpdate({clave:curso.clave}, curso, {new:true, runValidators:true});
            return resultado;
        }catch(error) {
            console.error(error);
            throw error;
        }
    }

    static async buscarCurso(idCurso) {
        try{
            const resultado= await Curso.find({_id:idCurso});
            return resultado;
        }catch(err){
            console.error(err);
            throw err;
        }
    }
}

module.exports = CursoDAO;
