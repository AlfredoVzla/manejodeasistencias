const { match } = require('assert');
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

    static async consultarPorGrupo(nombreGrupo, fechaDesde, fechaHasta){
        try{
            const consulta= await Asistencia.aggregate([
                {
                    $match: {
                        grupo: nombreGrupo
                    }
                },
                {
                    $unwind: "$fechas"
                },
                {
                    $match: {
                        "fechas.fecha": {
                            $gte: new Date(fechaDesde),
                            $lte: new Date(fechaHasta)
                        }
                    }
                },
                {
                    $group: {
                        _id:"$_id",
                        grupo: { $first: "$grupo" },
                        fechas: { $push: "$fechas" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                    }
                }
            ])
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
                        "fechas.asistencias.nombreEstudiante": alumno
                    }
                },
                {
                    $project: {
                        _id: 0,
                        fecha: "$fechas.fecha",
                        asistio: "$fechas.asistencias.asistio"
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