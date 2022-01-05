var mysql = require('mysql');
module.exports = () => {
        return mysql.createConnection({
            host: 'localhost',
            database: 'base_de_datos',
            user: 'root',
            password: 'darkipro1012'
        });
    }
    /*
    conectar.query('SELECT * from cliente', function(error, resultados, fields) {

        resultados.forEach(element => {
            console.log(element);
        });
    */