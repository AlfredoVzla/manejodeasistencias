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

    static async actualizar(unidad){
        try{
            var resultado= await Unidad.findOneAndUpdate({clave:unidad.clave}, unidad, {new:true, runValidators:true});
            return resultado;
        }catch(error) {
            console.error(error);
            throw error;
        }
    }

    static async eliminar(clave) {
        try {
            var resultado = await Unidad.findOneAndDelete({ clave: clave });
            return resultado;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = UnidadDAO;