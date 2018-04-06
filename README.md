  # ProyectoUP
  Arquitectura Web: Proyecto 2018
  
  * Integrantes
    - 101760 - Sergio Dominguez  - sergiocdominguez@gmail.com 
    - 090552 - Ignacio Lizarraga - nacho_95_@hotmail.com
  
  * Negocio a resolver
    - Se intenta realizar un aplicativo web que organice eventos para salir a jugar a un campo de golf.
  
  * Tecnologías en Uso
    - NodeJS
    - AngularJS
    - MongoDB
    
  * EndPoints de Api
  
    - Obtener Campos: /api/campos/get
    - Obtener CamposID: /api/campos/get {Parametros} (campo_id)
    - Crear Campo: /api/campos/crear/{Parametros} (campo_id,campo_nombre,campo_ubicacion(lat,lng),campo_direccion) 
    - Eliminar Campo: /api/campos/eliminar/{Parametros} (campo_id)
    - Modificar Campo: /api/campos/modificar/{Parametros} (campo_id,campo_nombre,campo_ubicacion(lat,lng),campo_direccion) 
    
    - Obtener Torneos: /api/torneos/get
    - Obtener TorneoID: /api/torneos/get {Parametros} (torneo_id)
    - Crear Torneo: /api/torneos/crear/{Parametros} (torneo_id, campo_id,torneo_nombre,torneo_fecha) 
    - Modificar Torneo: /api/torneos/modificar/{Parametros} (torneo_id, campo_id,torneo_nombre,torneo_fecha)
    - Inscribirse a Torneo: /api/torneos/inscribirse/{Parametros} (torneo_id, usuario_id)
    - Desinscribirse de Torneo: /api/torneos/describirse/{Parametros} (torneo_id, usuario_id)
    
    - Obtener Usuarios: /api/usuarios/get
    - Obtener UsuariosID: /api/usuarios/get/{Parametros} (usuario_id)
    - Crear de Usuarios: /api/usuarios/crear/{Parametros} (usuario_id, usuario_nombre, usuario_apellido, usuario_handicap)
    - Modificar de Usuarios: /api/usuarios/modificar/{Parametros} (usuario_id, usuario_nombre, usuario_apellido, usuario_handicap)
    - Eliminar Usuarios: /api/usuarios/eliminar/{Parametros} (usuario_id)
    
    
