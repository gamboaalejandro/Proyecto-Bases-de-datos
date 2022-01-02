const dbconec = require("./Conexion.js");

const conexion = dbconec();
conexion.query('SELECT * from cliente', function(error, resultados, fields) {
    resultados.forEach(element => {
        console.log(element);
    })
})