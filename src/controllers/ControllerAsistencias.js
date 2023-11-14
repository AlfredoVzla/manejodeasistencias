const asistenciasDAO = require('../data/AsistenciasDAO')
require('../data/database');
const csvtojson = require('csvtojson')

class ContollerAsistencia {
    static async cargarAsistencia(req, res) {
      try {
        const grupo = req.body.grupo;
        const filePath = req.file.path;
        const asistenciasProcesadas = await ContollerAsistencia.procesarArchivoCSV(filePath, grupo);
  
        const archivoCargado = await asistenciasDAO.cargar(asistenciasProcesadas);
        res.status(201).json(archivoCargado);
      } catch (err) {
        res.status(500).json({ error: 'No se pudo cargar o procesar el archivo' });
      }
    }
  
    static async procesarArchivoCSV(filePath, grupo) {
        try {
            const asistencias = await csvtojson({
                noheader: true,
                headers: ['Names', 'Attendance', 'ArrivalTime'],
            }).fromFile(filePath);
    
            
            const fechas = [{ fecha: new Date() }]; 
    
            const asistenciasProcesadas = [];
            asistencias.slice(3).forEach((asistencia) => {
                const tiempoLlegada = asistencia.ArrivalTime.split(' ');
                const horaLlegada = tiempoLlegada[0];
                const duracion = tiempoLlegada[1];
                const horaSalida = tiempoLlegada[2];
    
                const processedAsistencia = {
                    nombreEstudiante: asistencia.Names,
                    asistio: asistencia.Attendance === '✔',
                    horaAsistencia: {
                        llegada: horaLlegada,
                        duracion: duracion,
                        salida: horaSalida,
                    },
                };
    
                asistenciasProcesadas.push(processedAsistencia);
            });
    
            const dataToSave = {
                grupo: grupo,
                fechas: fechas.map((fecha) => {
                    return { ...fecha, asistencias: asistenciasProcesadas };
                }),
            };
    
            return [dataToSave];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
  
}

module.exports = ContollerAsistencia;