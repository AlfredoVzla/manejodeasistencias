const express = require('express');
const router = express.Router();
const controllerCurso = require('../controllers/ControllerCursos');

router.post('/nuevo', controllerCurso.agregarCurso);
router.put('/modificar', controllerCurso.actualizarCurso);

module.exports = router;
