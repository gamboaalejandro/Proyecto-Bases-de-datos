const express = require("express");
const router = express.Router();
const pool = require('../database');

router.get('/Producto', (req, res, next) => {
    res.send('algo')
    res.render('links/Producto');
    next();
})

router.post('/Producto', async(req, res, next) => {
    var producto = req.body;
    var Nro_Producto = producto.Producto;
    await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
    const Query = await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
    var caracteristica = Query[0].Caracteristicas;
    var algo = caracteristica.valueOf();
    console.log(algo);
    console.log(Query);
    res.render('links/Producto', { Query, algo });
});

router.get('/', async(req, res, next) => {
    res.send('algo');
});
module.exports = router;