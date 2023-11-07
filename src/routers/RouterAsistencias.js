const express = require('express');
const router = express.Router();
const { validarCSV } = require('../utils/validarFormato');
const controllerAsistencia = require('../controllers/ControllerAsistencias');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/nueva', upload.single('csvFile'), (req, res, next) => {
    // Aplicar el middleware antes de llamar al controlador
    validarCSV(req, res, next);

    controllerAsistencia.cargarAsistencia(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: 'Error al cargar asistencia' });
        }
    });
});


module.exports = router;
