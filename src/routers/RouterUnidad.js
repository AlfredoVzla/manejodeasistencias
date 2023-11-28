const express = require('express');
const router = express.Router();
const controllerUnidad = require('../controllers/ControllerUnidad');

router.post('/agregar', controllerUnidad.agregarUnidad);

module.exports = router;
