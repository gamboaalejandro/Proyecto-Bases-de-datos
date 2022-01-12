const express = require("express");
const router = express.Router();
const pool = require('../database');

router.get('/Producto', (req, res, next) => {
    //res.send('algo');
    console.log("-----get")
    res.render('links/Producto');
})

router.get('/Productx', (req, res, next) => {
    res.render('links/Producto');
})

router.get('/Producto/nuevo', (req, res, next) => {
    //res.send('algo');
    console.log("-----get")
    res.render('links/Producto');
})

router.get('/Producto/editar', (req, res, next) => {
    //res.send('algo');
    console.log("-----get")
    res.render('links/Producto');
})

router.post('/Producto/guardar', async(req, res, next) => {
    const varr = req.body;
    console.log(varr);
    console.log("-----post")

    //var Nro_Producto = producto.Producto;
    await pool.query("INSERT into producto set ? ", {
        id_producto: varr.id_producto,
        nombre: varr.nombre,
        Precio: 9.8,
        Caracteristicas: 'Roja xl',
        Materiales: 'PLASTICO',
        Montaje: 0,
        Id_categoriaP: 1,
        Cantidad: 10,
        'Instrucciones de uso': 'prueba'
    });
    const Query = null;
    console.log(Query);
    //var caracteristica = Query[0].Caracteristicas;
    //var algo = caracteristica.valueOf();
    //console.log(algo);   
    res.render('links/Producto', { info });
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

router.get('/adornosDeNavidad', async(req, res, next) => {
    res.render('links/adornosDeNavidad');
})

module.exports = router;