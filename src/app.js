const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');
const routerConsultas = require('./routers/RouterConsultas');

require('dotenv').config();
const PORT = process.env.PORT;
const routerCursos=require('./routers/RouterCursos');



app.use(express.json());
app.use('/asistencias', routerAsistencias);
app.use('/consultas', routerConsultas);
app.use('/cursos', routerCursos);

app.listen(PORT, () => {
    console.log('Servidor de asistencias');
})

