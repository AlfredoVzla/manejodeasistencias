const express = require('express');
const router = express.Router();
const { validarCSV } = require('../utils/validarFormato');
const controllerAsistencia = require('../controllers/ControllerAsistencias');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post('/nueva',upload.single('csvFile'), validarCSV ,controllerAsistencia.cargarAsistencia);

module.exports = router;
