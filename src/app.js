const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');
const routerConsultas = require('./routers/RouterConsultas');
const routerCursos=require('./routers/RouterCursos');
const routerUnidad=require('./routers/RouterUnidad');

require('dotenv').config();

const PORT = process.env.PORT;


app.use(express.json());
app.use('/asistencias', routerAsistencias);
app.use('/consultas', routerConsultas);
app.use('/cursos', routerCursos);
app.use('/unidad', routerUnidad);

app.listen(PORT, () => {
    console.log('Servidor de asistencias');
})

