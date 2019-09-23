const mysql = require('mysql');
class conexion {
    constructor() {
        this.getConnection();
    }

    getConnection() {
        this.conn = mysql.createConnection({
            host: 'dbmeusac.crddw3tng2v7.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'manager1',
            database: 'easytrip'
        });
        try {
            this.conn.connect();
        } catch{
            console.log("-----------------Conexion Fallida-------------------");
        }
        return this.conn;
    }

    getAll(tableName, callback) {
        this.conn.query("Select * from " + tableName, function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
                                 'codResultado' : -1}); }
            else {
                callback(result);
            }
        });
    }

    getById(tableName, id, callback) {
        this.conn.query("Select * from " + tableName +
                        " where id_"+tableName+" = " + id + ";", function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
                                 'codResultado' : -1}); }
            else {
                callback(result);
            }
        });
    }

    /******************************************************* */
    getIds(tableName, tableName2, columns, col1, col2, col3, callback){
        this.conn.query("Select "+ columns +
                        " from " + tableName + ", "+ tableName2 +
                        "\nwhere " + tableName+"."+col1+" = "+tableName2+"."+col2+
                        " and "+tableName+".id_sitio = "+col3+";",function(err,result){
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
                                'codResultado' : -1}); }
            else {
                callback({"comentarios":result});
            }                        
        });
    }
    /****************************************************** */

    insertById(tableName, data, columns, callback) {
        this.conn.query("INSERT INTO " + tableName + "("+columns+")" +
                        " VALUES("+data+");", function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al insertar la informacion",
                                 'codResultado' : -1}); }
            else {
                callback({'Descripcion': "Se ha insertado en la tabla "+tableName+" correctamente.",
                'codResultado' : 0});
            }
        });
    }

    insertGeneralById(tableName, data, columns, callback) {
        this.conn.query("INSERT INTO " + tableName + "("+columns+")" +
                        " VALUES("+data+");", function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al insertar la informacion",
                                 'codResultado' : -1}); }
            else {
                callback({'Descripcion': "Se ha insertado en la tabla "+tableName+" correctamente.",
                'codResultado' : 0});
            }
        });
    }

    getGroupedById(tableName,data, id, callback) {

        this.conn.query("Select * from " + tableName +
                        " where "+ data +" = " + id + " group by id_viaje;", function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
                                 'codResultado' : -1}); }
            else {
                callback(result);
            }
        });
    }

    deleteById(tableName,data, id, callback) {
        this.conn.query("DELETE from " + tableName +
                        " where "+data+" = " + id + ";", function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al borrar la informacion",
                                 'codResultado' : -1}); }
            else {
                callback({'Descripcion': "Se ha borrado en la tabla "+tableName+" correctamente.",
                'codResultado' : 0});
            }
        });

    }

    updateById(tableName, data, restriccion, callback){
        
        this.conn.query("UPDATE "+tableName+"\n"+
                        "SET "+data+'\n'+restriccion+";",function(err,result){
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado' : -1}); }
            else {
                callback({'Descripcion': "Se ha actualizado en la tabla "+tableName+" correctamente.",
                'codResultado' : 0});
            }
        });
    }
	
		
	normalQuery(consulta, callback) {
        this.conn.query(consulta, function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al obtener la informacion",
                                 'codResultado' : -1}); }
            else {
                callback(result);
            }
        });
    }
	
	deleteByQuery(consulta,tableName, callback) {
        this.conn.query(consulta, function (err, result) {
            if (err) { callback({'Descripcion': "Ha ocurrido un error al borrar la informacion",
                                 'codResultado' : -1}); }
            else {
                callback({'Descripcion': "Se ha borrado en la tabla "+tableName+" correctamente.",
                'codResultado' : 0});
            }
        });

    }

}

exports.conexion = conexion;