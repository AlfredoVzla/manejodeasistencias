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

    static async consultarPorGrupo(nombreGrupo){
        try{
            const consulta= await Asistencia.findOne({grupo: nombreGrupo});
            console.log(consulta)
            return consulta
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async consultarAsistenciasAlumno(nombreGrupo, alumno){
        try{
            const resultados= await Asistencia.aggregate([
                {
                    $match: {
                        grupo: nombreGrupo
                    }
                },
                {
                    $unwind: "$fechas"
                },
                {
                    $unwind: "$fechas.asistencias"
                },
                {
                    $match: {
                        "fechas.asistencias.nombreEstudiante": alumno,
                        "fechas.asistencias.asistio":true
                    }
                },
                {
                    $group: {
                        _id: null,
                        fechas: { $addToSet: "$fechas.fecha" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        fechas:  1
                    }
                }
            ])
            console.log(resultados);
            return resultados;
        } catch(err) {
            throw err;
        }  
    }
}

module.exports = AsistenciaDAO;