const express = require('express');
const router = express.Router();
const { validarCSV } = require('../utils/validarFormato');
const controllerAsistencia = require('../controllers/ControllerAsistencias');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// temporal:
router.post('/nueva',upload.single('csvFile') ,controllerAsistencia.cargarAsistencia);

/** Provoca errores con respuestas: */
// router.post('/nueva', upload.single('csvFile'), (req, res, next) => {
//     // Aplicar el middleware antes de llamar al controlador
//     validarCSV(req, res, next);

//     controllerAsistencia.cargarAsistencia(req, res, (err) => {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).send('Asistencia cargada correctamente');
//     });
// });


module.exports = router;
