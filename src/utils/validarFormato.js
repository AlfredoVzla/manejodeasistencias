const fs = require('fs');
const HttpStatusCodes = require('../enums/HttpStatusCodes');

function validarCSV(req, res, next) {
    const file = req.file;
    console.log('Tipo MIME del archivo:', file.mimetype);

    const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'El archivo no es un archivo .csv' });
    }

    fs.readFile(file.path, 'utf8', (err, fileContent) => {
        if (err) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al leer el archivo' });
        }

        const lines = fileContent.split('\n');

        if (!lines[0].startsWith('Attendance for:')) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'El archivo no tiene el formato correcto' });
        }

        const fileColumns = lines[2].trim().split(',');

        if (fileColumns.length < 3) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'El archivo no tiene el formato correcto' });
        }
        next();
    });
}

module.exports = { validarCSV };
