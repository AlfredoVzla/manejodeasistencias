const mongoose = require('mongoose');
const asistenciaAlumnoSchema = require('./AsistenciaAlumnoSchema');

const Schema = mongoose.Schema;

const fechaSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    asistencias: {
        type: [asistenciaAlumnoSchema],
        required: true
    }
}, { versionKey: false });

const Fecha = mongoose.model('Fecha', fechaSchema);
module.exports = Fecha;
