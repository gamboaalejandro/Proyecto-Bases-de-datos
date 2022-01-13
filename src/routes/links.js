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
    res.render('links/ProductoGuardar');
});

router.post('/ProductoGuardar', async(req, res, next) => {
    const varr = req.body;
    console.log(varr.id_producto);
    if (varr.Montaje)
        varr.Montaje = 1;
    else
        varr.Montaje = 0;
    console.log(varr.Montaje);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        //var Nro_Producto = producto.Producto;
        await pool.query("INSERT into producto set ? ", {
            id_producto: varr.id_producto,
            nombre: varr.Nombre,
            Precio: varr.Precio,
            Id_categoriaP: varr.CategoriaID,
            Caracteristicas: varr.Caracteristicas,
            Materiales: varr.materiales,
            Montaje: varr.Montaje,
            Cantidad: varr.cantidad,
            Instrucciones: varr.Instrucciones
        });
    } else {
        // usar libreria pop up 
        res.send("ta malo maldita");

    }
    res.render('links/ProductoGuardar');


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

router.get('/productoPlantilla', async(req, res, next) => {
    res.render('links/productoPlantilla');
})

module.exports = router;