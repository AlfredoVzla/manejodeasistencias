const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1/asistencias'

mongoose.connect(MONGO_URI)

mongoose.connection.on('open', _ => {

})