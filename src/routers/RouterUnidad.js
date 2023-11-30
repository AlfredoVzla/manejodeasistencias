const express = require('express');
const router = express.Router();
const controllerUnidad = require('../controllers/ControllerUnidad');

router.post('/agregar', controllerUnidad.agregarUnidad);
router.put('/actualizar', controllerUnidad.actualizarUnidad);
router.delete('/eliminar', controllerUnidad.eliminarUnidad);

module.exports = router;
