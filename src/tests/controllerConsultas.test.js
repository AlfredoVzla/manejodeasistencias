const { expect } = require('chai');
const ControllerConsulta = require('../controllers/ControllerConsulta');
const asistenciasDAO = require('../data/AsistenciasDAO');

describe('Pruebas para la consulta para visualizar asistencia', () => {
    it('Debería obtener las asistencias de un alumno correctamente', async () => {
        const req = { body: { grupo: 'GrupoX', alumno: 'AlumnoY' } };
        const res = {
            status: function (statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        const consultaEsperada = [ {
            grupo: "GrupoX",
            fechas: [
                {
                    fecha: new Date('2023-10-01'),
                    asistencias: [
                        {
                            nombreEstudiante: "Estudiante A",
                            asistio: true,
                            horaAsistencia: {
                                llegada: "08:00",
                                duracion: "3 horas",
                                salida: "11:00"
                            }
                        },
                        {
                            nombreEstudiante: "Estudiante B",
                            asistio: false,
                            horaAsistencia: {
                                llegada: "08:30",
                                duracion: "2 horas",
                                salida: "10:30"
                            }
                        },
                       
                    ]
                },
                {
                    fecha: new Date('2023-10-03'),
                    asistencias: [
                        {
                            nombreEstudiante: "Estudiante A",
                            asistio: true,
                            horaAsistencia: {
                                llegada: "08:10",
                                duracion: "3 horas",
                                salida: "11:10"
                            }
                        },
                        {
                            nombreEstudiante: "Estudiante B",
                            asistio: true,
                            horaAsistencia: {
                                llegada: "08:20",
                                duracion: "2 horas",
                                salida: "10:20"
                            }
                        },
                       
                    ]
                },
               
            ]
        },];
        
        const consultarAsistenciasAlumnoStub = sinon.stub(asistenciasDAO, 'consultarAsistenciasAlumno').resolves(consultaEsperada);

        await ControllerConsulta.asistenciasAlumno(req, res);

        expect(res.statusCode).to.equal(200); 
        expect(res.data).to.deep.equal(consultaEsperada);

        consultarAsistenciasAlumnoStub.restore();
    });

    it('Debería obtener las asistencias de un grupo en un rango de fechas', async () => {
        const req = { body: { grupo: 'GrupoZ', desde: '2023-01-01', hasta: '2023-12-31' } };
        const res = {
            status: function (statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json: function (data) {
                this.data = data;
            }
        };

        const consultaEsperada = [/* Datos simulados de asistencias para el grupo en el rango de fechas */];
        const consultarPorGrupoStub = sinon.stub(asistenciasDAO, 'consultarPorGrupo').resolves(consultaEsperada);

        await ControllerConsulta.asistenciasGrupo(req, res);

        expect(res.statusCode).to.equal(200);
        expect(res.data).to.deep.equal(consultaEsperada); 

        consultarPorGrupoStub.restore();
    });
});
