const express = require('express');
const router = express.Router();
const controllerCurso = require('../controllers/ControllerCursos');

router.post('/nuevo', controllerCurso.agregarCurso);

module.exports = router;
