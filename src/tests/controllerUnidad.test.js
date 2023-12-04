const { expect } = require('chai');
const sinon = require('sinon');
const HttpStatusCodes = require('../enums/HttpStatusCodes');
const UnidadDAO = require('../data/UnidadDAO');
const ControllerUnidad = require('../controllers/ControllerUnidad');

describe('Pruebas para ControllerUnidad', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Debería agregar una unidad correctamente', async () => {
    const unidadMock = {
      clave: '123',
      nombre: 'Unidad Test',
      responsable: 'Responsable Test',
      telefono: '123456789',
    };

    const createStub = sinon.stub(UnidadDAO, 'agregar').resolves(unidadMock);

    const res = {
      status: sinon.stub(),
      json: sinon.stub().returns({}),
    };
  
    try {
      const resultado = await ControllerUnidad.agregarUnidad({ body: unidadMock }, res);
  
      expect(resultado).to.deep.equal(unidadMock);
  
      expect(res.status.calledWith(HttpStatusCodes.OK)).to.be.true;
      expect(res.json.calledWith(unidadMock)).to.be.true;
  
    } catch (error) {
      console.error(error);
    } finally {
      createStub.restore();
    }
  });

  it('Debería manejar errores al agregar una unidad', async () => {
    const unidadConError = {
      clave: '123',
      responsable: 'Responsable Test',
      telefono: '123456789',
    };

    const createStub = sinon.stub(UnidadDAO, 'agregar').rejects(
      new Error('Error al agregar unidad')
    );

    const res = {
      status: sinon.stub(),
      json: sinon.stub().returns(undefined), 
    };

    try {
      await ControllerUnidad.agregarUnidad({ body: unidadConError }, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
    }

    createStub.restore();
  });
});