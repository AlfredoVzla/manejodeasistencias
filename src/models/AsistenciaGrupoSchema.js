const mongoose = require('mongoose');
const fechaSchema = require('./FechaSchema');

const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
    grupo: {
        type: String,
        required: true
    },
    fechas: {
        type: [fechaSchema],
        required: true
    }
}, { versionKey: false });

const AsistenciaGrupo = mongoose.model('AsistenciaGrupo', asistenciaSchema);

module.exports = AsistenciaGrupo;
