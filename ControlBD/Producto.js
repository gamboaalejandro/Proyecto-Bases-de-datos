/*var dbconec = require("./Conexion.js");

var conexion = dbconec();
var someVar = [];

conexion.query('SELECT Primer_nombre from cliente where Primer_nombre= "Pedro"', function(err, rows) {
    if (err) {
        throw err;
    } else {
        setValue(rows);
    }
});

function setValue(value) {
    someVar = value;
    console.log(someVar[0].Primer_nombre);
}
conexion.end();*/

var uno = document.getElementById("floatingInput");

uno.addEventListener('change', function(e) {
    return e.target.value;

})