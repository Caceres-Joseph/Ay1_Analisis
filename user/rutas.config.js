const db = require('../helpers/conexion');
const user_model = require('../user/create_user_Model');
exports.routesConfig = function (app) {
    app.post('/user/login', (req, res) => {
        query = `SELECT * FROM usuario WHERE email = '`+ req.body['email'] + `' AND password = '` + req.body['pass'] + `';`;
        db.doQuery(query,(result)=>{
            if(Array.isArray(result)){
                result = result[0];
            }
            res.send(result);
        });
    });

    app.get('/userid/login/:email/:pass', (req, res) => {
        query = `SELECT id_usuario FROM usuario WHERE email = '`+ req.params.email + `' AND password = '` + req.params.pass + `';`;
        db.doQuery(query,(result)=>{
            if(Array.isArray(result)){
                result = result[0];
            }
            res.send(result);
        });
    });

    app.get('/user/id/:usuarioId', (req, res) => {
        query = `SELECT * FROM usuario WHERE id_usuario = `+ req.params.usuarioId + `;`;
        db.doQuery(query,(result)=>{
            if(Array.isArray(result)){
                result = result[0];
            }
            res.send(result);
        });
    });

    app.post('/user/new',(req, res) => {
        
        var c3 = '\''+req.body['nombre']+'\','+'\''+req.body['apellido']+'\','+'\''+req.body['email']+'\','+'\''+req.body['pass']+'\','+req.body['edad']
        db.insertGeneralById('usuario', c3 ,user_model , (data) => {
            res.send(data);
        });
    });
};