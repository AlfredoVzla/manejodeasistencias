const Asistencia = require('../models/Asistencia')

class AsistenciaDAO {

    static async cargar(asistencias){
        try {
            console.log(asistencias)
            const resultados = await Asistencia.insertMany(asistencias);
            return resultados;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = AsistenciaDAO;