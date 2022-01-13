const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');



router.get('/Producto/nuevo', (req, res, next) => {
    //res.send('algo');
    console.log("-----get", );
    res.render('links/Producto');
})

router.get('/Producto/editar', (req, res, next) => {
    //res.send('algo');
    console.log("-----get")
    res.render('links/Producto');
})

router.get('/ProductoGuardar', async(req, res, next) => {
    const varr = req.body;
    console.log(varr);
    console.log("-----post");
    //var Nro_Producto = producto.Producto;
    /*  await pool.query("INSERT into producto set ? ", {
          id_producto: varr.id_producto,
          nombre: varr.nombre,
          Precio: varr.Precio,
          Caracteristicas: 'sadasd',
          Materiales: 'PLASTICO',
          Montaje: 0,
          Id_categoriaP: 1,
          Cantidad: 10,
          'Instrucciones de uso': 'prueba'
      });*/
    res.render('links/ProductoGuardar');
});

router.post('/ProductoGuardar', async(req, res, next) => {
    console.log("tomado post")
    res.send(req.body);

});



router.get('/Producto', async(req, res, next) => {

    var producto = req.query;
    console.log(Object.keys(producto).length);
    if (Object.keys(producto).length !== 0) {
        var Nro_Producto = producto.Producto;
        const Query = await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
        console.log(Query);
        res.render('links/Producto', { Query })

    } else {
        res.render('links/Producto')

    }

});

router.get('/', async(req, res, next) => {
    res.send('algo');

});

router.get('/adornosDeNavidad', async(req, res, next) => {
        res.render('links/adornosDeNavidad');
    })
    //Eliminacion de productos

router.get('/delete/:id_producto', async(req, res, next) => {
    console.log("Entrando A delete");
    const id_Producto = req.params.id_producto;
    //await pool.query("DELETE FROM producto where id_producto = ?", [id_Producto]);
    res.render('links/Producto');
});

router.get('/lucesNavidad', async(req, res, next) => {
    res.render('links/lucesNavidad');
})

module.exports = router;