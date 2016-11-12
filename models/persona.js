/**
 * Created by soygo on 22/10/2016.
 */
'use strict';

var tb_persona = require('../connection.js');

var Persona = {
    nombre   : String,
    correo   : String,
    telefono : String,
    edad     : Number
};

//Function para traer todos las personas
function obtenerPersonas(res){
    var personas = [];
    tb_persona.connection.query('SELECT * FROM persona', function(err, rows){
        if(err) throw err;
        rows.forEach(function(result){
            personas.push(result);
        });
        res.send(personas);
    });
}

//Fcuntion para guardar personas
function guardarPersona(body,res){
    if(body.length > 1) {
        body.forEach(function (persona) {
            savingUser(persona);
        });
        res.send();
    }
    else{
        savingUser(body);
        res.send();
    }
}

function savingUser(persona) {
    Persona.nombre = persona.nombre;
    Persona.correo = persona.correo;
    Persona.telefono = persona.telefono;
    Persona.edad = persona.edad;

    tb_persona.connection.query("INSERT INTO persona SET ?", Persona,function(err,result){
        if(err) throw err;
        console.log(result);
    });
}

//Function para remover personas
function eliminarPersona(user,res){
    tb_persona.connection.query("DELETE FROM persona WHERE id=" + user.id);
    res.send();
}

module.exports.obtenerPersonas = obtenerPersonas;
module.exports.guardarPersona = guardarPersona;
module.exports.eliminarPersona = eliminarPersona;