const db = require('../helpers/conexion');
const comentarioModel = require('../sitios/sitioModel');

exports.routesConfig = function (app) {
    app.get('/sitio/:sitioId', (req, res) => {
        conn = new db.conexion();
        query = `select s.id_sitio, s.nombre, s.calificacion, s.precio, s.latitud, s.longitud, s.ciudad, s.id_pais, s.imagen, s.descripcion, c.id_categoria, c.categoria
        from sitio s
            inner join CxV CV
                on s.id_sitio = CV.id_sitio
            inner join categoria c on CV.id_categoria = c.id_categoria
            where s.id_sitio  = `+req.params.sitioId;
        conn.normalQuery(query, (data) => {
            res.send(data);
        });
    });

    app.get('/sitio', (req, res) => {
        conn = new db.conexion();
        query = `select s.id_sitio, s.nombre, s.calificacion, s.precio, s.latitud, s.longitud, s.ciudad, s.id_pais, s.imagen, s.descripcion, c.id_categoria, c.categoria
        from sitio s
            inner join CxV CV
                on s.id_sitio = CV.id_sitio
            inner join categoria c on CV.id_categoria = c.id_categoria`;
        conn.normalQuery(query, (data) => {
            res.send({"sitio":data});
        });
    });
};