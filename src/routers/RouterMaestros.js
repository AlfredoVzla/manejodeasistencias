const express = require('express');
const router = express.Router();
const controllerMaestro = require('../controllers/ControllerMaestro');

router.post('/login',controllerMaestro.logearMaestro);

module.exports = router;