const sql = require('mssql');
exports.config = {
    user: 'admin1',
    password: '1234admin!',
    server: 'analisis1-1s2019.database.windows.net',
    database: 'ProyectoClase',
    encrypt: true
};

exports.doQuery = (query, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        if (rows.length == 0) {
            callback({
                'Descripcion': "No se han encontrado datos",
                'codResultado': -1,
                'Salida': true
            })
        } else {
            callback(rows);
        }
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1,
            'Salida': false
        })
        sql.close();
    });
}

exports.insertById = (tableName, data, columns, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "INSERT INTO " + tableName + "(" + columns + ")" +
            " VALUES(" + data + ");";
        return pool.request().query(query)
    }).then(result => {
        callback({
            'Descripcion': "Se ha insertado en la tabla " + tableName + " correctamente.",
            'codResultado': 0,
            'Salida': true
        });
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al insertar la informacion",
            'codResultado': -1,
            'Salida': false
        })
        sql.close();
    });
}

exports.getAll = (tableName, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "Select * from " + tableName + ";";
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        callback(rows);
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.getById = (tableName, id, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "Select * from " + tableName +
        " where id_" + tableName + " = " + id + ";";
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        callback(rows);
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.getIds = (tableName, tableName2, columns, col1, col2, col3, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "Select " + columns +
        " from " + tableName + ", " + tableName2 +
        "\nwhere " + tableName + "." + col1 + " = " + tableName2 + "." + col2 +
        " and " + tableName + ".id_sitio = " + col3 + ";";
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        callback({ "comentarios": rows });
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.insertGeneralById = (tableName, data, columns, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "INSERT INTO " + tableName + "(" + columns + ")" +
        " VALUES(" + data + ");";
        return pool.request().query(query)
    }).then(result => {
        callback({
            'Descripcion': "Se ha insertado en la tabla " + tableName + " correctamente.",
            'codResultado': 0,
            'Salida': true
        });
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al insertar la informacion",
            'codResultado': -1,
            'Salida': false
        })
        sql.close();
    });
}

exports.getGroupedById = (tableName, data, id, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "Select * from " + tableName +
        " where " + data + " = " + id + " group by id_viaje;";
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        callback(rows);
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.deleteById = (tableName, data, id, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "DELETE from " + tableName +
        " where " + data + " = " + id + ";";
        return pool.request().query(query)
    }).then(result => {
        callback({
            'Descripcion': "Se ha borrado en la tabla " + tableName + " correctamente.",
            'codResultado': 0
        })
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al borrar la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.updateById = (tableName, data, restriccion, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = "UPDATE " + tableName + "\n" +
        "SET " + data + '\n' + restriccion + ";";
        return pool.request().query(query)
    }).then(result => {
        callback({
            'Descripcion': "Se ha actualizado en la tabla " + tableName + " correctamente.",
            'codResultado': 0
        })
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al obtener la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}

exports.deleteByQuery = (consulta, tableName, callback) => {
    new sql.ConnectionPool(this.config).connect().then(pool => {
        query = consulta;
        return pool.request().query(query)
    }).then(result => {
        callback({
            'Descripcion': "Se ha borrado en la tabla " + tableName + " correctamente.",
            'codResultado': 0
        })
        sql.close();
    }).catch(err => {
        callback({
            'Descripcion': "Ha ocurrido un error al borrar la informacion",
            'codResultado': -1
        })
        sql.close();
    });
}