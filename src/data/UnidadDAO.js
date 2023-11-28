const Unidad = require('../models/UnidadSchema');  

class UnidadDAO {
    static async agregar(unidad) {
        try {
            var resultado= await Unidad.create(unidad);
            return resultado;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = UnidadDAO;