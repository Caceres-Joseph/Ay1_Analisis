const config = require('../helpers/env.config');
const db = require('../helpers/conexion');
const bodyParser = require('body-parser');
const paisModel = require('../paises/paisModel').default;
const GESTION = require('../helpers/models').GESTION;
const OBJETO = require('../helpers/models').OBJETO;
exports.routesConfig = function (app) {

    app.get('/pais', (req, res) => {
        conn = new db.conexion();
        conn.getAll('pais', (data) => {
            res.send(data);
        });
    });

    app.get('/pais/:paisId', (req, res) => {
        conn = new db.conexion();
        conn.getById('pais', req.params.paisId, (data) => {
            res.send(data);
        });
    });

    app.post('/pais', (req, res) => {
        conn = new db.conexion();
        conn.insertById('pais', '\''+req.body['pais']+'\'', paisModel, (data) => {
            res.send(data);
        });
    });

    app.get('/viajes/:usuarioId',(req,res) =>{
        conn = new db.conexion();
        conn.getGroupedById('viaje', 'id_usuario', req.params.usuarioId, (data) => {
            res.send(data);
        });
    });

    app.post('/viaje', (req, res) => {
        conn = new db.conexion();
        //concatenamos los valores a insertar
        c2 = "'"+req.body['nombre']+"'";
        c3 =c2 + ','+req.body['id_usuario'];
        //formato al insertar
        c4 = 'nombre, id_usuario';


        conn.insertGeneralById('viaje', c3 ,c4 , (data) => {
            res.send(data);
        });
    });
    
    app.get('/viaje/:viajeId',(req,res) =>{
        conn = new db.conexion();
        conn.getGroupedById('viaje','id_viaje', req.params.viajeId, (data) => {
            res.send(data);
        });
    });

    app.put('/viaje/:viajeId',(req,res) => {
        conn = new db.conexion();
        cuerpo = OBJETO.nuevoGESTION(req.body['nombre'],GESTION.NOMBRE);

        restriccion = "WHERE " + GESTION.ID + " = " + req.params.viajeId;
        restriccion = restriccion + " AND " + GESTION.USUARIO + " = " +req.body['id_usuario'];
 
        conn.updateById('viaje', cuerpo, restriccion, (data) => {
            res.send(data);
        });
    });

    app.delete('/viaje/:viajeId',(req,res) =>{
        conn = new db.conexion();
        conn.deleteById('viaje','id_viaje', req.params.viajeId, (data) => {
            res.send(data);
        });
    });
	
		//PAISES EN EL VIAJE DE X USUARIO DE Y VIAJE
	app.get('/:usuarioId/viaje/:viajeId/pais', (req, res) => {
        conn = new db.conexion();
        conn.normalQuery('SELECT easytrip.pais.id_pais, easytrip.pais.pais FROM easytrip.pais, easytrip.VxPais, easytrip.viaje, easytrip.usuario WHERE easytrip.pais.id_pais = easytrip.VxPais.id_pais AND easytrip.viaje.id_viaje = easytrip.VxPais.id_viaje AND easytrip.usuario.id_usuario = easytrip.viaje.id_usuario AND easytrip.usuario.id_usuario = ' + req.params.usuarioId + ' AND easytrip.viaje.id_viaje = ' + req.params.viajeId + ';', (data) => {
            res.send(data);
        });
    });
	
	//QUITAR X PAIS DE Y VIAJE DE Z USUARIO
	app.delete('/:usuarioId/viaje/:viajeId/pais/:paisId',(req,res) =>{
        conn = new db.conexion();
        conn.deleteByQuery('DELETE FROM easytrip.VxPais WHERE (id_viaje = '+req.params.viajeId+') and (id_pais = '+req.params.paisId+');', 'VxPais', (data) => {
            res.send(data);
        });
    });
	
	
	app.post('/viaje/pais', (req, res) => {
        conn = new db.conexion();
        //concatenamos los valores a insertar
        c2 = "'"+req.body['id_viaje']+"'";
        c3 =c2 + ','+req.body['id_pais'];
        //formato al insertar
        c4 = 'id_viaje, id_pais';


        conn.insertGeneralById('VxPais', c3 ,c4 , (data) => {
            res.send(data);
        });
    });

};