const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const asistenciaSchema = new Schema ({
    nombreEstudiante: {
        type: String,
        required: true
    },
    fechaClase: {
        type: Date,
        required: true
    },
    asistio: {
        type: Boolean,
        default: false 
    },
    horaAsistencia: {
        llegada: {
            type: String,
            required: true
        }, 
        duracion: {
            type: String,
            required: true
        },
        salida: {
            type: String,
            required: true
        }

    }
})

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);

module.exports = Asistencia;
