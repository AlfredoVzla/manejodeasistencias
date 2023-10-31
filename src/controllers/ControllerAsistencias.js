const asistenciasDAO = require('../data/AsistenciasDAO')
require('../data/database');
const csvtojson = require('csvtojson')

class ContollerAsistencia {
    static async cargarAsistencia(req, res) {
        try {
            console.log(req.file.path);
            const asistenciasProcesadas = await ContollerAsistencia.procesarArchivoCSV(req.file.path);
           
            const archivoCargado = await asistenciasDAO.cargar(asistenciasProcesadas);
            res.status(201).json(archivoCargado);
        } catch (err) {
            res.status(500).json({ error: 'No se pudo cargar o procesar el archivo' });
        }
    }


    static async procesarArchivoCSV(filePath) { 
            try {
                const asistencias = await csvtojson({
                    noheader: true, 
                    headers: ['Names', 'Attendance', 'ArrivalTime'] 
                }).fromFile(filePath);
    
                const datosAsistencias = asistencias.slice(3);
                const asistenciasProcesadas = datosAsistencias.map(asistencia => {
                    const tiempoLlegada = asistencia.ArrivalTime.split(' ');
                    const horaLlegada = tiempoLlegada[0];
                    const duracion = tiempoLlegada[1];
                    const horaSalida = tiempoLlegada[2];
    
                    return {
                        nombreEstudiante: asistencia.Names,
                        fechaClase: new Date(),
                        asistio: asistencia.Attendance === "✔",
                        horaAsistencia: {
                            llegada: horaLlegada,
                            duracion: duracion,
                            salida: horaSalida
                        }
                    };
                });
                return asistenciasProcesadas;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
}





module.exports = ContollerAsistencia;