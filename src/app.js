const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');
const routerConsultas = require('./routers/RouterConsultas');
const routerCursos=require('./routers/RouterCursos');

require('dotenv').config();

const PORT = process.env.PORT;


app.use(express.json());
app.use('/asistencias', routerAsistencias);
app.use('/consultas', routerConsultas);
app.use('/cursos', routerCursos);

app.listen(8721, () => {
    console.log('Servidor de asistencias');
})

