const db = require('../helpers/conexion');
const favoritoModel = require('../favoritos/favoritoModel');

exports.routesConfig = function (app) {
    app.get('/favorito/:idUsuario', (req, res) => {
        query = `select s.id_usuario, s.nombre, s.apellido, s.email, s2.id_sitio, s2.nombre
        from usuario s
            inner join favXUser fXU on s.id_usuario = fXU.id_usuario
            inner join sitio s2 on fXU.id_sitio = s2.id_sitio
            where s.id_usuario = `+ req.params.idUsuario + `;`;
            db.doQuery(query, (data) => {
            res.send({ "favoritos": data });
        });
    });

    app.post('/favorito', (req, res) => {
        datos = req.body['id_sitio'] + ', ' + req.body['id_usuario'];
        db.insertById('favXUser', datos, favoritoModel, (data) => {
            res.send(data);
        });
    });

    app.delete('/favorito', (req, res) => {
        query = `Delete 
                 from favXUser 
                 where id_usuario = `+ req.body['id_usuario'] +
            ` and id_sitio = ` + req.body['id_sitio'];
        db.deleteByQuery(query, 'favXUser', (data) => {
            res.send(data);
        });
    });
};