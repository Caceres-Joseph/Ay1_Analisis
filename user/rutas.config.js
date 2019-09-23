const db = require('../helpers/conexion');
const userModel = require('../user/userModel');
const config = require('../helpers/env.config');
const bodyParser = require('body-parser');

exports.routesConfig = function (app) {
	
	app.get('/user/login/:email/:pass', (req, res) => {
        conn = new db.conexion();
        conn.normalQuery('SELECT * FROM easytrip.usuario WHERE easytrip.usuario.email = "'+ req.params.email +'" AND easytrip.usuario.password = ' + req.params.pass + ';', (data) => {
            res.send(data);
        });
    });
	
	app.get('/userid/login/:email/:pass', (req, res) => {
        conn = new db.conexion();
        conn.normalQuery('SELECT id_usuario FROM easytrip.usuario WHERE easytrip.usuario.email = "'+ req.params.email +'" AND easytrip.usuario.password = ' + req.params.pass + ';', (data) => {
            res.send(data);
        });
    });
	
	app.get('/user/id/:usuarioId', (req, res) => {
        conn = new db.conexion();
        conn.normalQuery('SELECT * FROM easytrip.usuario WHERE easytrip.usuario.id_usuario = ' + req.params.usuarioId + ';', (data) => {
            res.send(data);
        });
    });
	
	
};