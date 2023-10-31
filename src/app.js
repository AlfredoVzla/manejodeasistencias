const express = require ('express');
const app = express();
const routerAsistencias = require('./routers/RouterAsistencias');


require('dotenv').config();
const PORT = process.env.PORT;

app.use('/asistencias', routerAsistencias);

app.listen(PORT, () => {
    console.log('Servidor de asistencias')
})

