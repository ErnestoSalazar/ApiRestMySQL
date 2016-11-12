/**
 * Created by soygo on 22/10/2016.
 */
'use strict';
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

connection.connect(function(err){
    if(err) throw err;
    console.log('Conectado a mysql');
});



module.exports.connection = connection;