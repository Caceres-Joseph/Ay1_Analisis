const db = require('../helpers/conexion');
const paisModel = require('../paises/paisModel').default;
const GESTION = require('../helpers/models').GESTION;
const OBJETO = require('../helpers/models').OBJETO;
exports.routesConfig = function (app) {
    app.get('/pais', (req, res) => {
        db.getAll('pais', (data) => {
            res.send(data);
        });
    });

    app.get('/pais/:paisId', (req, res) => {
        db.getById('pais', req.params.paisId, (data) => {
            res.send(data);
        });
    });

    app.post('/pais', (req, res) => {
        db.insertById('pais', '\''+req.body['pais']+'\'', paisModel, (data) => {
            res.send(data);
        });
    });

    app.get('/viajes/:usuarioId',(req,res) =>{
        db.doQuery('Select * from  viaje where  id_usuario = '+ req.params.usuarioId + ';' , (data) => {
            res.send(data);
        });
    });

    app.post('/viaje', (req, res) => {
        //concatenamos los valores a insertar
        c2 = "'"+req.body['nombre']+"'";
        c3 =c2 + ','+req.body['id_usuario'];
        //formato al insertar
        c4 = 'nombre, id_usuario';
        db.insertGeneralById('viaje', c3 ,c4 , (data) => {
            res.send(data);
        });
    });
    
    app.get('/viaje/:viajeId',(req,res) =>{
        db.getGroupedById('viaje','id_viaje', req.params.viajeId, (data) => {
            res.send(data);
        });
    });

    app.put('/viaje/:viajeId',(req,res) => {
        cuerpo = OBJETO.nuevoGESTION(req.body['nombre'],GESTION.NOMBRE);

        restriccion = "WHERE " + GESTION.ID + " = " + req.params.viajeId;
        restriccion = restriccion + " AND " + GESTION.USUARIO + " = " +req.body['id_usuario'];
 
        db.updateById('viaje', cuerpo, restriccion, (data) => {
            res.send(data);
        });
    });

    app.delete('/viaje/:viajeId',(req,res) =>{
        db.deleteById('viaje','id_viaje', req.params.viajeId, (data) => {
            res.send(data);
        });
    });
	
		//PAISES EN EL VIAJE DE X USUARIO DE Y VIAJE
	app.get('/:usuarioId/viaje/:viajeId/pais', (req, res) => {
        db.doQuery('SELECT easytrip.pais.id_pais, easytrip.pais.pais FROM easytrip.pais, easytrip.VxPais, easytrip.viaje, easytrip.usuario WHERE easytrip.pais.id_pais = easytrip.VxPais.id_pais AND easytrip.viaje.id_viaje = easytrip.VxPais.id_viaje AND easytrip.usuario.id_usuario = easytrip.viaje.id_usuario AND easytrip.usuario.id_usuario = ' + req.params.usuarioId + ' AND easytrip.viaje.id_viaje = ' + req.params.viajeId + ';', (data) => {
            res.send(data);
        });
    });
	
	//QUITAR X PAIS DE Y VIAJE DE Z USUARIO
	app.delete('/:usuarioId/viaje/:viajeId/pais/:paisId',(req,res) =>{
        db.deleteByQuery('DELETE FROM easytrip.VxPais WHERE (id_viaje = '+req.params.viajeId+') and (id_pais = '+req.params.paisId+');', 'VxPais', (data) => {
            res.send(data);
        });
    });
	
	
	app.post('/viaje/pais', (req, res) => {
        //concatenamos los valores a insertar
        c2 = req.body['id_viaje'];
        c3 =c2 + ','+req.body['id_pais'];
        //formato al inser	tar
        c4 = 'id_viaje, id_pais';
        db.insertGeneralById('VxPais', c3 ,c4 , (data) => {
            res.send(data);
        });
    });
    app.post('/update/presupuesto/pais',(req,res)=>{
        id_viaje = req.body['id_viaje'];
        id_pais = req.body['id_pais'];
        tiempo = req.body['tiempo'];
        presupuesto = req.body['presupuesto']
       query = "update vxpais set tiempo="+tiempo+",presupuesto="+presupuesto+"where id_viaje="+id_viaje+"and id_pais="+id_pais;
       db.doQuery(query,(data) => {
           res.send(data);
        });
    });

    app.post('/update/presupuesto/sitio',(req,res)=>{
        id_viaje = req.body['id_viaje'];
        id_sitio = req.body['id_sitio'];
        tiempo = req.body['tiempo'];
        presupuesto = req.body['presupuesto']
       query = "update vxs set tiempo="+tiempo+",presupuesto="+presupuesto+"where id_viaje="+id_viaje+"and id_pais="+id_pais;
       db.doQuery(query,(data) => {
           res.send(data);
        });
    });
    app.post('/presupuesto/planificacion',(req,res)=>{
        id_planificacion = req.body['id_planificacion'];
        tiempo = req.body['tiempo'];
        presupuesto = req.body['presupuesto']
       query = "update vxp set tiempo=tiempo+"+tiempo+",presupuesto=presupuesto+"+presupuesto+"where id_planificacion="+id_planificacion;
       db.doQuery(query,(data) => {
           res.send(data);
        });
    });

};