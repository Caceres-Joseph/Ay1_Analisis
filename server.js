'use strict';
const config = require('./helpers/env.config');
const express = require('express');
const bodyParser = require('body-parser');
const PaisesRouter = require('./paises/rutas.config');
const ComentariosRouter = require('./comentarios/rutas.config');
const SitiosRouter = require('./sitios/rutas.config');
const FavoritosRouter = require('./favoritos/rutas.config');
const UserRouter = require('./user/rutas.config');
const PlanificacionRouter = require('./planificacion/rutas.config');
const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	} else {
		return next();
	}
});

app.use(bodyParser.json());
PaisesRouter.routesConfig(app);
ComentariosRouter.routesConfig(app);
SitiosRouter.routesConfig(app);
FavoritosRouter.routesConfig(app);
UserRouter.routesConfig(app);
PlanificacionRouter.routesConfig(app);


app.listen(config.port, () => {
	console.log(`Running on ${config.appEndpoint}`);
});