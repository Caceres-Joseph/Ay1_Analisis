const db = require('../helpers/conexion');
const comentarioModel = require('../comentarios/comentarioModel');

exports.routesConfig = function (app) {
    app.post('/comentario', (req, res) => {
        datos = '\''+req.body['comentario']+'\', ' + req.body['id_sitio'] + ", " + req.body['puntuacion'] + ", " + req.body['id_usuario'];
        conn = new db.conexion();
         conn.insertById('comentario', datos, comentarioModel, (data) => {
            res.send(data);
        });
    });
    
    /************************************************************/

    app.get('/comentario/:sitioId',(req,res)=>{
        conn = new db.conexion();
        conn.getIds('comentario','usuario','comentario.id_comentario,  usuario.nombre, usuario.apellido, usuario.email, comentario.comentario, comentario.puntuacion, comentario.id_sitio',
        'id_usuario','id_usuario',req.params.sitioId,  (data)=>{
            res.send(data);
        });
    });

    /***********************************************************/

};