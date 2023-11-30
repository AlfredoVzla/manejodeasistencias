const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const maestroSchema = new Schema({
    clave:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{ versionKey: false });

const Maestro = mongoose.model('Maestro', maestroSchema);

module.exports = Maestro;