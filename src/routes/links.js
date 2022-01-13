const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');

// BLOQUE PARA MODIFICAR LOS PRODUCTOS       
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
    const producto = {
        id_producto: varr.id_producto,
        nombre: varr.nombre,
        Precio: varr.precio,
        Caracteristicas: varr.caracteristicas,
        Materiales: varr.materiales,
        Montaje: varr.Montaje,
        Id_categoriaP: varr.categoriaid,
        Cantidad: varr.cantidad,
        Instrucciones: varr.instrucciones
    }
    console.log(producto);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        await pool.query("UPDATE producto set ? WHERE id_producto = ? ", [producto, varr.id_producto]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)


        res.render('links/Producto');
    } else {
        // usar libreria pop up mensaje  que ta malo
        res.send("ta malo maldita");
    }
})

//////FIN DEL BLOQUE PARA MODIFICAR ////// 

//////INICIO DEL CODIGO DE PARA ANADIR UN PRODUCTO ////// 
router.get('/ProductoGuardar', async(req, res, next) => {
    res.render('links/ProductoGuardar');
});
// FUNCIOA PARA ANADIR UN PRODUCTO
router.post('/ProductoGuardar', async(req, res, next) => {
    const varr = req.body;
    console.log(varr.Montaje);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
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

//////FIN DEL CODIGO DE PARA ANADIR UN PRODUCTO ////// 


//////FIN DEL CODIGO DE PARA ANADIR UN PRODUCTO ////// 

//////BUSQUEDA DE UN PRODUCTO ////// 

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

    ////// FIN DEL BLOQUE BUSQUEDA DE UN PRODUCTO ////// 

});


router.get('/adornosDeNavidad', async(req, res, next) => {

    res.render('links/adornosDeNavidad');
})
router.get('/ProductoPlantilla/:id', async(req, res, next) => {
        const Nro_Producto = req.params.id;
        console.log(Nro_Producto);
        const Query = await pool.query("Select * from Producto where id_producto = ?", Nro_Producto);
        console.log("asdsadasdadads", Query);
        res.render('links/productoPlantilla', { Query });
    })
    //Eliminacion de productos

router.get('/delete/:id_producto', async(req, res, next) => {
    console.log("Entrando A delete");
    const id_Producto = req.params.id_producto;
    await pool.query("DELETE FROM producto where id_producto = ?", [id_Producto]);
    res.render('links/Producto');
});

router.get('/lucesNavidad', async(req, res, next) => {
    res.render('links/lucesNavidad');
})

router.get('/productoPlantilla', async(req, res, next) => {
    res.render('links/productoPlantilla');
})

router.get('/comidaNavidad', async(req, res, next) => {
    res.render('links/comidaNavidad');
})

router.get('/arbolesNavidad', async(req, res, next) => {
    res.render('links/arbolesNavidad');
})

router.get('/mantelesNavidad', async(req, res, next) => {
    res.render('links/mantelesNavidad');
})

router.get('/reposteriaNavidad', async(req, res, next) => {
    res.render('links/reposteriaNavidad');
})

router.get('/Categoria', async(req, res, next) => {
    res.render('links/Categoria');
})


module.exports = router;