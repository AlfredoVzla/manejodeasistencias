const { expect } = require('chai');
const ControllerAsistencia = require('../controllers/ControllerAsistencias.js');


describe('Pruebas para procesarArchivoCSV', () => {
    it('Debería procesar un archivo CSV correctamente', async () => {
      const filePath = 'ruta/al/archivo.csv';
      const asistenciasProcesadasEsperadas = [ /* Datos simulados */ ];
      const csvToJSONStub = sinon.stub(csvtojson, 'fromFile').resolves(/* Datos simulados */);
  
      const asistenciasProcesadas = await ControllerAsistencia.procesarArchivoCSV(filePath);
      expect(asistenciasProcesadas).to.deep.equal(asistenciasProcesadasEsperadas);
  
      csvToJSONStub.restore();
    });
  
    it('Debería manejar errores al procesar un archivo CSV', async () => {
      const filePath = 'ruta/archivo/inexistente.csv';
      const csvToJSONStub = sinon.stub(csvtojson, 'fromFile').rejects(new Error('Error al procesar archivo CSV'));
  
      try {
        await ControllerAsistencia.procesarArchivoCSV(filePath);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
  
      csvToJSONStub.restore();
    });
  });
