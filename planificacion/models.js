 const GESTION = {
    ID: 'id_planificacion',
    NOMBRE: 'nombre',
    USUARIO: 'id_usuario',
	FECHAINICIO: 'fecha_inicio',
	FECHAFIN: 'fecha_fin',
}


const OBJETO = {
    nuevoGESTION:function(valor,tipo){
        return tipo +" = '"+valor+"'";
    }
}

const FECHA = {
    nuevoGESTION:function(valor,tipo){
        return tipo +" = CAST('"+valor+"' AS DATETIME) ";
    }
}

module.exports.OBJETO = OBJETO;
module.exports.FECHA = FECHA;
module.exports.GESTION = GESTION;