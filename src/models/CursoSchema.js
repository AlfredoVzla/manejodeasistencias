const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const cursoSchema = new Schema({
    nombre:{
        type: String,
        required:true
    }, 
    clave:{
        type: String,
        required:true
    }, 
    instructor:{
        type: String,
        required:true
    },
    fechaRegistro: {
        type: Date,
        required: true
    }
}, { versionKey: false });

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;
