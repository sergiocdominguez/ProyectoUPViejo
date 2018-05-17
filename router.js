var express = require("express");

var Horario = require("./models/bd").Horario;
var Usuario = require("./models/bd").Usuario;
var Campo = require("./models/bd").Campo;
var Linea = require("./models/bd").Linea;
var Torneo = require("./models/bd").Torneo;

var router = express.Router();

//API USUARIOS

//Redirige a la vista de alta
router.get("/usuarios/new",function(req, res){
    res.render("../views/api/alta_usuario");
});
//Redirige a la vista de Editar para poder hacer PUT
router.get("/usuarios/:id/editar",function(req, res){
    Usuario.findById(req.params.id,function(err,usuario){
        if(err) {
            res.send("No se encontro el usuario");
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
         res.render("../views/api/editar_usuario",{usuario:usuario});
        }
    }); 
});

//Muestra todos los usuarios
router.route("/usuarios/")
.get(function(req, res){
    
    var mysort = { apellido: 1, nombre: 1,};

    Usuario.find({},function(err,usuarios){
        if(err) {
            res.send("No se encontro el usuario "+err);
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
         res.render("../views/api/index_usuarios",{usuarios:usuarios});
        }
    }).sort(mysort); 
})
//Crea nuevo usuario
.post(function(req, res){  
    var usuario = new Usuario({nombre: req.body.nombre.trim(),
                               apellido: req.body.apellido.trim(),
                               email: req.body.email.trim().toLowerCase(), 
                               edad: req.body.edad.trim(),
                               handicap: req.body.handicap.trim()
                                });
    usuario.save().then(function(us){
                        res.redirect("/api/usuarios");
                     }, function(err){
                           if(err){
                              res.send("No se pudo guardar "+ err);
                           }
                        }
                    );    
})
;
//Muestra un usuario
router.route("/usuarios/:id")
.get(function(req, res){
    Usuario.find({_id: req.params.id},function(err,usuarios){
        if(err) {
            res.send("No se encontro el usuario "+ err);
        }
        else{
         res.render("../views/api/index_usuarios",{usuarios:usuarios});
        }
    }); 
});

//Edita usuario
router.route("/usuarios/:id")
.put(function(req, res){
    var consulta = {_id: req.params.id};
    var valores = { 
        $set: {
            nombre: req.body.nombre.trim(), 
            apellido: req.body.apellido.trim(),
            edad: req.body.edad.trim(),
            email: req.body.email.trim().toLowerCase(),
            handicap: req.body.handicap.trim()
            } 
        };

    Usuario.updateOne(consulta, valores,function(err,usuarios){
        if(err) {
            res.send("No se encontro el usuario para editar " + err);
        }
        else{
         res.redirect("/api/usuarios");
        }
    });

                                
})
//Elimina usuario
.delete(function(req, res){
    Usuario.deleteOne({_id: req.params.id},function(err){
        if(err) {
            res.send("No se encontro el usuario para eliminar "+ err);
        }
        else{
         res.redirect("/api/usuarios");
        }
    });
})
;

//API CAMPOS
//Redirige a la vista de alta
router.get("/campos/new",function(req, res){
    res.render("../views/api/alta_campo");
});
//Redirige a la vista de Editar para poder hacer PUT
router.get("/campos/:id/editar",function(req, res){
    Campo.findById(req.params.id,function(err,campo){
        if(err) {
            res.send("No se encontro el campo");
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
         res.render("../views/api/editar_campo",{campo:campo});
        }
    }); 
});

//Muestra todos los campos
router.route("/campos/")
.get(function(req, res){
    
    var mysort = { apellido: 1, nombre: 1,};

    Campo.find({},function(err,campos){
        if(err) {
            res.send("No se encontro el campo "+err);
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
         res.render("../views/api/index_campos",{campos:campos});
        }
    }).sort(mysort); 
})
//Crea nuevo campo
.post(function(req, res){  
    var campo = new Campo({nombre: req.body.nombre.trim(), 
                           ubicacion: req.body.ubicacion.trim(),
                           coordenadas: [req.body.lat.trim(), req.body.long.trim()]
                        });
    campo.save().then(function(us){
                        res.redirect("/api/campos");
                     }, function(err){
                           if(err){
                              res.send("No se pudo guardar "+ err);
                           }
                        }
                    );    
})
;
//Muestra un campo
router.route("/campos/:id")
.get(function(req, res){
    Campo.find({_id: req.params.id},function(err,campos){
        if(err) {
            res.send("No se encontro el campo "+ err);
        }
        else{
         res.render("../views/api/index_campos",{campos:campos});
        }
    }); 
});

//Edita campo
router.route("/campos/:id")
.put(function(req, res){
    var consulta = {_id: req.params.id};
    var valores = { 
        $set: {
            nombre: req.body.nombre.trim(), 
            ubicacion: req.body.ubicacion.trim(),
            coordenadas: [req.body.lat.trim(), req.body.long.trim()]
            } 
        };

    Campo.updateOne(consulta, valores,function(err,campos){
        if(err) {
            res.send("No se encontro el campo para editar " + err);
        }
        else{
         res.redirect("/api/campos");
        }
    });

                                
})
//Elimina campo
.delete(function(req, res){
    Campo.deleteOne({_id: req.params.id},function(err){
        if(err) {
            res.send("No se encontro el campo para eliminar "+ err);
        }
        else{
         res.redirect("/api/campos");
        }
    });
})
;

//API LINEAS
//Redirige a la vista de alta
router.get("/lineas/new",function(req, res){
    var mysort = { apellido: 1, nombre: 1,};
    Usuario.find({},function(err,usuarios){
        if(err) {
            res.send("No se encontro el usuario "+err);
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
         res.render("../views/api/alta_linea",{usuarios:usuarios});
        }
    }).sort(mysort); 
});
//Redirige a la vista de Editar para poder hacer PUT
router.get("/lineas/:id/editar",function(req, res){
    Linea.findById(req.params.id,function(err,linea){
        if(err) {
            res.send("No se encontro el linea");
        }
        else{
         //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista 
         Usuario.find({},function(err,usuarios){
            if(err) {
                res.send("No se encontro el usuario "+err);
            }
            else{
             //paso el parametro imagenes devuelto por la funcion al parametro imagenes de la vista  
             res.render("../views/api/editar_linea",{linea:linea, usuarios:usuarios});
            }

        });  
        }
    }); 
});

//Muestra todos los lineas
router.route("/lineas/")
.get(function(req, res){
    Linea.find({},function(err,lineas){
        if (err){
            res.send("No se encontro el linea a mostrar "+err);
        }else{
            Usuario.populate(lineas, {path: "id_usuario1"},function(err, lineas){
                Usuario.populate(lineas, {path: "id_usuario2"},function(err, lineas){
                    Usuario.populate(lineas, {path: "id_usuario3"},function(err, lineas){
                        Usuario.populate(lineas, {path: "id_usuario4"},function(err, lineas){
                            res.render("../views/api/index_lineas",{lineas:lineas});
                        });              
                    });
                });
            });
        }
    })
    ; 
});

//Crea nuevo linea
router.route("/lineas/")
.post(function(req, res){  
    var linea = new Linea({
                           id_usuario1: req.body.usuario1.trim(),
                           id_usuario2: req.body.usuario2.trim(),
                           id_usuario3: req.body.usuario3.trim(),
                           id_usuario4: req.body.usuario4.trim()
                        });
    linea.save().then(function(us){
                        res.redirect("/api/lineas");
                     }, function(err){
                           if(err){
                              res.send("No se pudo guardar "+ err);
                           }
                        }
                    );    
})
;
//Muestra un linea
router.route("/lineas/:id")
.get(function(req, res){
    Linea.find({_id: req.params.id},function(err,lineas){
        if (err){
            res.send("No se encontro el linea a mostrar "+err);
        }else{
            Usuario.populate(lineas, {path: "id_usuario1"},function(err, lineas){
                Usuario.populate(lineas, {path: "id_usuario2"},function(err, lineas){
                    Usuario.populate(lineas, {path: "id_usuario3"},function(err, lineas){
                        Usuario.populate(lineas, {path: "id_usuario4"},function(err, lineas){
                            res.render("../views/api/index_lineas",{lineas:lineas});
                        });              
                    });
                });
            });
        }
    }); 
});

//Edita linea
router.route("/lineas/:id")
.put(function(req, res){  
    
    var consulta = {_id: req.params.id};
    var valores = { 
        $set: {
            id_usuario1: req.body.usuario1.trim(),
            id_usuario2: req.body.usuario2.trim(),
            id_usuario3: req.body.usuario3.trim(),
            id_usuario4: req.body.usuario4.trim()
            } 
        };

    Linea.updateOne(consulta, valores,function(err,lineas){
        if(err) {
            res.send("No se encontro el linea para editar " + err);
        }
        else{
         res.redirect("/api/lineas");
        }
    });
    
                                
})
//Elimina linea
.delete(function(req, res){
    Linea.deleteOne({_id: req.params.id},function(err){
        if(err) {
            res.send("No se encontro el linea para eliminar "+ err);
        }
        else{
         res.redirect("/api/lineas");
        }
    });
})
;

//API TORNEOS
//Redirige a la vista de alta
router.get("/torneos/new",function(req, res){
    Campo.find({}, function(err, campos){
        Linea.find({}, function(err, lineas){
            Usuario.populate(lineas, {path: "id_usuario1"}, function(err){
                Usuario.populate(lineas, {path: "id_usuario2"}, function(err){
                    Usuario.populate(lineas, {path: "id_usuario3"}, function(err){
                        Usuario.populate(lineas, {path: "id_usuario4"}, function(err){
                            Horario.find({}, function(err, horarios){
                                res.render("../views/api/alta_torneo", {campos:campos, lineas:lineas, horarios:horarios});
                            });
                        });
                    });
                });
            });
        });
    });

});
//Redirige a la vista de Editar para poder hacer PUT
router.get("/torneos/:id/editar",function(req, res){
    Torneo.findById(req.params.id,function(err,torneo){
        if(err) {
            res.send("No se encontro el torneo");
        }
        else{
            Campo.find({}, function(err, campos){
                Linea.find({}, function(err, lineas){
                    Usuario.populate(lineas, {path: "id_usuario1"}, function(err){
                        Usuario.populate(lineas, {path: "id_usuario2"}, function(err){
                            Usuario.populate(lineas, {path: "id_usuario3"}, function(err){
                                Usuario.populate(lineas, {path: "id_usuario4"}, function(err){
                                    Horario.find({}, function(err, horarios){
                                        res.render("../views/api/editar_torneo", {torneo:torneo, campos:campos, lineas:lineas, horarios:horarios});
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    }); 
});

//Muestra todos los torneos
router.route("/torneos/")
.get(function(req, res){
    Torneo.find({},function(err,torneos){
        if(err) {
            res.send("No se encontro el torneo "+err);
        }
        else{
         Campo.populate(torneos, {path: "campo"},function(err, torneos){
            //res.render("../views/api/index_torneos",{torneos:torneos});
            Horario.populate(torneos, {path: "horario"},function(err, torneos){
                //res.render("../views/api/index_torneos",{torneos:torneos});
                Linea.populate(torneos, {path: "linea"},function(err, torneos){
                    Usuario.populate(torneos, {path: "linea.id_usuario1"},function(err, lineas){
                        Usuario.populate(torneos, {path: "linea.id_usuario2"},function(err, lineas){
                            Usuario.populate(torneos, {path: "linea.id_usuario3"},function(err, lineas){
                                Usuario.populate(torneos, {path: "linea.id_usuario4"},function(err, lineas){
                                    //res.render("../views/api/index_lineas",{lineas:lineas});
                                    res.render("../views/api/index_torneos",{torneos:torneos});
                                });              
                            });
                        });
                    });
                });
            });
        });
        }
    }); 
})

//Crea nuevo torneo
.post(function(req, res){  
    var torneo = new Torneo({fecha: req.body.fecha.trim(), 
                            campo: req.body.campo.trim(),
                            linea: req.body.linea.trim(),
                            horario: req.body.horario.trim()
                        });
    torneo.save().then(function(us){
                        res.redirect("/api/torneos");
                     }, function(err){
                           if(err){
                              res.send("No se pudo guardar "+ err);
                           }
                        }
                    );   
})
;
//Muestra un torneo
router.route("/torneos/:id")
.get(function(req, res){
    Torneo.find({_id: req.params.id},function(err,torneos){
        if(err) {
            res.send("No se encontro el torneo por id"+ err);
        }
        else{
            Campo.populate(torneos, {path: "campo"},function(err, torneos){
               //res.render("../views/api/index_torneos",{torneos:torneos});
               Horario.populate(torneos, {path: "horario"},function(err, torneos){
                   //res.render("../views/api/index_torneos",{torneos:torneos});
                   Linea.populate(torneos, {path: "linea"},function(err, torneos){
                       Usuario.populate(torneos, {path: "linea.id_usuario1"},function(err, lineas){
                           Usuario.populate(torneos, {path: "linea.id_usuario2"},function(err, lineas){
                               Usuario.populate(torneos, {path: "linea.id_usuario3"},function(err, lineas){
                                   Usuario.populate(torneos, {path: "linea.id_usuario4"},function(err, lineas){
                                       //res.render("../views/api/index_lineas",{lineas:lineas});
                                       res.render("../views/api/index_torneos",{torneos:torneos});
                                   });              
                               });
                           });
                       });
                   });
               });
           });
        }
    }); 
});

//Edita torneo
router.route("/torneos/:id")
.put(function(req, res){
    var consulta = {_id: req.params.id};
    var valores = { 
        $set: {
            fecha: req.body.fecha.trim(), 
            campo: req.body.campo.trim(),
            linea: req.body.linea.trim(),
            horario: req.body.horario.trim()
            } 
        };

    Torneo.updateOne(consulta, valores,function(err,torneos){
        if(err) {
            res.send("No se encontro el torneo para editar " + err);
        }
        else{
         res.redirect("/api/torneos");
        }
    });

                                
})
//Elimina torneo
.delete(function(req, res){
    Torneo.deleteOne({_id: req.params.id},function(err){
        if(err) {
            res.send("No se encontro el torneo para eliminar "+ err);
        }
        else{
         res.redirect("/api/torneos");
        }
    });
})
;
router.get("/horarios/new",function(req, res){
    res.render("../views/api/alta_horario");
});
//Muestra todos los horarios
router.route("/horarios/")
.get(function(req, res){
    Horario.find({},function(err,horarios){
        res.render("../views/api/index_horarios",{horarios:horarios});
    }); 
})

//Crea nuevo horario
.post(function(req, res){  
    var horario = new Horario({
                          descripcion: req.body.descripcion.trim()
                        });
    horario.save().then(function(us){
                        res.redirect("/api/horarios");
                     }, function(err){
                           if(err){
                              res.send("No se pudo guardar "+ err);
                           }
                        }
                    );    
})
;
//Elimina horario
router.route("/horarios/:id")
.delete(function(req, res){
    Horario.deleteOne({_id: req.params.id},function(err){
        if(err) {
            res.send("No se encontro el horario para eliminar "+ err);
        }
        else{
         res.redirect("/api/horarios");
        }
    });
})
;
module.exports = router;