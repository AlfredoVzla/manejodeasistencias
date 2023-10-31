const express = require('express');
const router = express.Router();
const controllerAsistencia = require('../controllers/ControllerAsistencias');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/nueva',upload.single('csvFile') ,controllerAsistencia.cargarAsistencia);

module.exports = router; 