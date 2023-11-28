const mongoose= require('mongoose');
const Curso = require('./CursoSchema');  

const Schema=mongoose.Schema;

const unidadSchema = new Schema({
    clave:{
        type: String,
        required:true
    }, 
    nombre:{
        type: String,
        required:true
    },
    responsable: {
        type: String,
        required: true
    },
    telefono: {
        type: String, 
        required: true
    },
    cursos: [{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: false
    }]
}, { versionKey: false });

const Unidad = mongoose.model('Unidad', unidadSchema);
module.exports = Unidad;