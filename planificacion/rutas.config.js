const db = require('../helpers/conexion');
const planificacion_model = require('../planificacion/create_planificacion_Model');
const planificacionModel = require('../planificacion/planificacionModel').default;
const GESTION = require('../planificacion/models').GESTION;
const OBJETO = require('../planificacion/models').OBJETO;
const FECHA = require('../planificacion/models').FECHA;
exports.routesConfig = function (app) {


    app.get('/planificacion/porusuario/:Idusuario', (req, res) => {
        db.doQuery('Select id_planificacion, nombre, convert(varchar, fecha_inicio, 23) as fecha_inicio, convert(varchar, fecha_fin, 23) as fecha_fin , tiempo, presupuesto, id_usuario from  planificacion where  id_usuario = '+ req.params.Idusuario + ';' , (data) => {
            res.send(data);
        });
    });
	
	app.get('/planificacion/una/:Idplanificacion', (req, res) => {
        db.doQuery('Select id_planificacion, nombre, convert(varchar, fecha_inicio, 23) as fecha_inicio, convert(varchar, fecha_fin, 23) as fecha_fin , tiempo, presupuesto, id_usuario from  planificacion where  id_planificacion = '+ req.params.Idplanificacion + ';' , (data) => {
            res.send(data);
        });
    });
	
	app.post('/planificacion/nuevaplanificacion', (req, res) => {
        //concatenamos los valores a insertar
        c2 = "'"+req.body['nombre']+"'";
        c3 =c2 + ','+req.body['id_usuario'];
        //formato al inser	tar
        c4 = 'nombre, id_usuario';
        db.insertGeneralById('planificacion', c3 ,c4 , (data) => {
            res.send(data);
        });
    });
	
	app.delete('/planificacion/borrar/:Idplanificacion',(req,res) =>{
        db.deleteById('planificacion','id_planificacion', req.params.Idplanificacion, (data) => {
            res.send(data);
        });
    });
	
	app.put('/planificacion/edit/:Idplanificacion',(req,res) => {
        cuerpo = OBJETO.nuevoGESTION(req.body['nombre'],GESTION.NOMBRE);
        restriccion = "WHERE " + GESTION.ID + " = " + req.params.Idplanificacion;
        restriccion = restriccion + " AND " + GESTION.USUARIO + " = " +req.body['id_usuario'];
 
        db.updateById('planificacion', cuerpo, restriccion, (data) => {
            res.send(data);
        });
    });
	
	app.get('/planviaje/getplanviaje/:Idplanificacion', (req, res) => {
        db.doQuery('SELECT VxP.id_planificacion, VxP.id_viaje, viaje.nombre,VxP.tiempo, VxP.presupuesto FROM VxP,viaje WHERE viaje.id_viaje = VxP.id_viaje AND id_planificacion = '+ req.params.Idplanificacion + ';' , (data) => {
            res.send(data);
        });
    });
	
	app.put('/planificacion/edit/fechainicio/:Idplanificacion',(req,res) => {
        cuerpo = FECHA.nuevoGESTION(req.body['fecha_inicio'],GESTION.FECHAINICIO);
        restriccion = "WHERE " + GESTION.ID + " = " + req.params.Idplanificacion;
        restriccion = restriccion + " AND " + GESTION.USUARIO + " = " +req.body['id_usuario'];
 
        db.updateById('planificacion', cuerpo, restriccion, (data) => {
            res.send(data);
        });
    });
	
	app.put('/planificacion/edit/fechafin/:Idplanificacion',(req,res) => {
        cuerpo = FECHA.nuevoGESTION(req.body['fecha_fin'],GESTION.FECHAFIN);
        restriccion = "WHERE " + GESTION.ID + " = " + req.params.Idplanificacion;
        restriccion = restriccion + " AND " + GESTION.USUARIO + " = " +req.body['id_usuario'];
 
        db.updateById('planificacion', cuerpo, restriccion, (data) => {
            res.send(data); 
        });
    });
	
	app.get('/planviaje/getviajes/:Idusuario', (req, res) => {
        db.doQuery('SELECT id_viaje,nombre FROM viaje WHERE id_usuario = '+ req.params.Idusuario + ';' , (data) => {
            res.send(data);
        });
    });
	
	app.post('/planviaje/nuevo', (req, res) => {
        //concatenamos los valores a insertar
        c2 = req.body['id_planificacion'];
        c3 =c2 + ','+req.body['id_viaje'];
		c3 = c3 + ','+req.body['tiempo']
		c3 = c3 + ','+req.body['presupuesto']
        //formato al inser	tar
        c4 = 'id_planificacion, id_viaje, tiempo , presupuesto';
        db.insertGeneralById('VxP', c3 ,c4 , (data) => {
            res.send(data);
        });
    });
	
	app.delete('/planviaje/borrar/:Idplanificacion/:Idviaje',(req,res) =>{
        db.deleteByQuery('DELETE FROM VxP WHERE id_planificacion = '+ req.params.Idplanificacion+' AND id_viaje = '+ req.params.Idviaje + ';' , 'VxP' , (data) => {
            res.send(data);
        });
    });
	
	

};