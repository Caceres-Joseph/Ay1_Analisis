# EasyTrip-API
---

API del proyecto EasyTrip

### Pre-requisitos 📋
1. Tener instalado node js 
2. Tener instalado npm
### Instalación 🔧
1. Clonar el repositorio
2. Dirigirse a la carpeta raiz donde se encuentra el package.json
3. Instalar Express
```
npm i express
```
4. Instalar mysql
```
npm  install mysql
```

# INFORMACION API
---    
### 1. get /pais
>Mostrar los paises existentes

### 2. get /pais/:paisId
>Obtener el pais por su id

### 3. post /pais   Content-Type: application/json, body { "pais": "España" }
>Inserta un nuevo pais

### 4. get /viajes/:usuarioId
>Obtiene todos los viajes por id de usuario

### 5. get /viaje/:viajeId
>Obtiene un viaje unicamente

### 6. put /viaje/:viajeId Content-Type: application/json, body { "nombre":"Montana", "id_usuario": 2}
>Actualiza un valor de viaje

### 7. delete /viaje/:viajeId
>Borra un registro de viaje de la base de datos

### 8. post /viaje   Content-Type: application/json, body { "nombre":"Montana", "id_usuario": 3 }
>Mostrar los paises existentes

### 9. post /comentario   Content-Type: application/json, body {"comentario" : "prueba volcan", "id_lugar_turistico": 1, "puntuacion": 3, "id_usuario": 1}
>Inserta un nuevo comentario

### 10. get /comentario 
>Obtiene todos los comentarios

