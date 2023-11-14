const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');
const routerConsultas = require('./routers/RouterConsultas');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/asistencias', routerAsistencias);
app.use('/consultas', routerConsultas);

app.listen(PORT, () => {
    console.log('Servidor de asistencias')
})

