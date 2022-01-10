const express = require("express");
const router = express.Router();
const pool = require('../database');

router.get('/Producto', (req, res, next) => {
    //res.send('algo');
    res.render('links/Producto');
})

router.post('/Producto', async(req, res, next) => {
    const varr = req;
    console.log(varr);
    //var Nro_Producto = producto.Producto;
    await pool.query("INSERT into producto set ? ", {
        id_producto: 99,
        nombre: "Falda",
        Precio: 9.8,
        Caracteristicas: 'Roja xl',
        Materiales: 'PLASTICO',
        Montaje: 0,
        Id_categoriaP: 10,
        Cantidad: 10,
        'Instrucciones de uso': 'ponersela'
    });
    const Query = null;
    console.log(Query);
    //var caracteristica = Query[0].Caracteristicas;
    //var algo = caracteristica.valueOf();
    //console.log(algo);   
    res.render('links/Producto', { Query });
});
/*
router.post('/Producto', async(req, res, next) => {
    var producto = req.body;
    var Nro_Producto = producto.Producto;
    //await pool.query("INSERT into producto set ?", [producto]);
    const Query = await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
    console.log(Query);
    //var caracteristica = Query[0].Caracteristicas;
    //var algo = caracteristica.valueOf();
    //console.log(algo); 
    next();
});*/

router.get('/', async(req, res, next) => {
    res.send('algo');

});

module.exports = router;