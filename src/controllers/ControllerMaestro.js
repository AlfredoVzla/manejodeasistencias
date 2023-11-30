const MaestroDAO = require('../data/MaestroDAO');
require('../data/database');

class ControllerMaestro{
    static async logearMaestro(req,res){
        try {
            const maestro = req.body;
            console.log(maestro);
            const result = await MaestroDAO.login(maestro.clave,maestro.password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({error: 'No existe un maestro con esas credenciales'});
        }
    }
}

module.exports = ControllerMaestro;