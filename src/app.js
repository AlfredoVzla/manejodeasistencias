const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');
const routerConsultas = require('./routers/RouterConsultas');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const routerCursos=require('./routers/RouterCursos');
const routerUnidad=require('./routers/RouterUnidad');



app.use(cors());
app.use(express.json());
app.use('/asistencias', routerAsistencias);
app.use('/consultas', routerConsultas);
app.use('/cursos', routerCursos);
app.use('/unidad', routerUnidad);

app.listen(PORT, () => {
    console.log('Servidor de asistencias');
})

