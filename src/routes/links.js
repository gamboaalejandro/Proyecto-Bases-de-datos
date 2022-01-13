const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');
var alerta = require('sweetalert');


router.get('/modificar/:id_producto', async(req, res, next) => {
    var producto = req.params.id_producto;
    console.log('putaputa')
    const Query = await pool.query("Select * from Producto where id_producto = ? ", [producto]);
    console.log(Query);
    res.render('links/ProductoModificar', { Query: Query[0] })
});
router.post('/modificar/:id_producto', async(req, res, next) => {
    const ID = req.params.id_producto;
    const varr = req.body;

    if (varr.Montaje)
        varr.Montaje = 1;
    else
        varr.Montaje = 0;

    const producto = {
        id_producto: varr.id_producto,
        nombre: varr.nombre,
        Precio: varr.precio,
        Caracteristicas: varr.caracteristicas,
        Materiales: varr.materiales,
        Montaje: varr.montaje,
        Id_categoriaP: varr.categoriaid,
        Cantidad: varr.cantidad,
        Instrucciones: varr.instrucciones
    }
    console.log(producto);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        //var Nro_Producto = producto.Producto;

        await pool.query("UPDATE producto set ? WHERE id_producto = ? ", [producto, varr.id_producto]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)


        res.render('links/Producto');
    } else {
        // usar libreria pop up mensaje  que ta malo
        res.send("ta malo maldita");
    }
})

router.get('/Producto/editar', (req, res, next) => {
    //res.send('algo');
    console.log("-----get")
    res.render('links/Producto');
})

router.get('/ProductoGuardar', async(req, res, next) => {
    res.render('links/ProductoGuardar');
});
// FUNCIOA PARA ANADIR UN PRODUCTO
router.post('/ProductoGuardar', async(req, res, next) => {
    const varr = req.body;
    if (varr.Montaje)
        varr.Montaje = 1;
    else
        varr.Montaje = 0;
    console.log(varr.Montaje);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        //var Nro_Producto = producto.Producto;
        /*await pool.query("INSERT into producto set ? ", {
            id_producto: varr.id_producto,
            nombre: varr.Nombre,
            Precio: varr.Precio,
            Id_categoriaP: varr.CategoriaID,
            Caracteristicas: varr.Caracteristicas,
            Materiales: varr.materiales,
            Montaje: varr.Montaje,
            Cantidad: varr.cantidad,
            Instrucciones: varr.Instrucciones
        });*/
    } else {
        // usar libreria pop up 
        res.send("ta malo maldita");
    }
    res.render('links/ProductoGuardar');


});



router.get('/Producto', async(req, res, next) => {
    var p2 = req.body;
    var producto = req.query;
    console.log("el objeto", p2);
    console.log(Object.keys(producto).length);
    if (Object.keys(producto).length !== 0) {
        var Nro_Producto = producto.Producto;
        const Query = await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
        //validacion de montaje
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