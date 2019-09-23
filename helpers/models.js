const GESTION = {
    ID: 'id_viaje',
    NOMBRE: 'nombre',
    USUARIO: 'id_usuario',
}


const OBJETO = {
    nuevoGESTION:function(valor,tipo){
        return tipo +" = '"+valor+"'";
    }
}

module.exports.OBJETO = OBJETO;
module.exports.GESTION = GESTION;