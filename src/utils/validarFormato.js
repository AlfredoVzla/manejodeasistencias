const fs = require('fs');

function validarCSV(req, res, next) {
    const file = req.file;

    // Validar que el archivo sea un archivo .csv
    if (file.mimetype !== 'text/csv') {
        return res.status(400).json({ error: 'El archivo no es un archivo .csv' });
    }

    // Leer el archivo de manera síncrona para validar el formato
    const fileContent = fs.readFileSync(file.path, 'utf8');
    const lines = fileContent.split('\n');

    // Validar la tercera línea (línea de encabezados)
    const expectedHeader = 'Names,2020-09-10 11:29,Arrival time';
    if (lines[2].trim() !== expectedHeader) {
        return res.status(400).json({ error: 'El archivo no tiene el formato correcto' });
    }else{
        next();
        return res.status(200).json({ Exito: 'Formato cargado correctamente' });
    }
}

module.exports = { validarCSV };
