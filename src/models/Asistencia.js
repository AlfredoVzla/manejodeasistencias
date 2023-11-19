const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const asistenciaAlumnoSchema = new Schema ({
    nombreEstudiante: {
        type: String,
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
}, {versionKey:false})

const fechaSchema= new Schema({
    fecha: {
        type: Date,
        required: true
    },
    asistencias: {
        type: [asistenciaAlumnoSchema],
        required: true
    }
}, {versionKey:false})

const asistenciaSchema= new Schema({
    grupo: {
        type: String,
        required: true
    },
    fechas: {
        type: [fechaSchema],
        required: true
    }
}, {versionKey:false})

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);

module.exports = Asistencia;