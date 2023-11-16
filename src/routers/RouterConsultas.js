const express = require('express');
const router = express.Router();
const controllerConsultas = require('../controllers/ControllerConsultas');

router.post('/alumno', controllerConsultas.asistenciasAlumno);
router.post('/grupo', controllerConsultas.asistenciasGrupo);

module.exports = router; 