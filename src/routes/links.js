const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');

//------------------------------------------------------PROCEDIMIENTOS DE PRODUCTOS   

//MODIFICACION DE PRODUCTOS
router.get('/modificar/:id_producto', async(req, res, next) => {
    var producto = req.params.id_producto;
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
        // usar libreria pop up mensaje  que ta malo  aqui se usa el flash pero toy cansao asi que xd
        res.send("ta malo maldita");
    }
})


//AÑADIR UN PRODUCTO 
router.get('/ProductoGuardar', async(req, res, next) => {
    res.render('links/ProductoGuardar');
});


router.post('/ProductoGuardar', async(req, res, next) => {
    const varr = req.body;
    console.log(varr.Montaje);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.CategoriaID !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        req.flash('success', 'Producto Insertado satisfactoriamente');
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


//BUSQUEDA DE UN PRODUCTO 
router.get('/Producto', async(req, res, next) => {
    var producto = req.query;
    console.log(Object.keys(producto).length);
    if (Object.keys(producto).length !== 0) {
        var Nro_Producto = producto.Producto;
        const Query = await pool.query("Select * from Producto where id_producto = ? ", Nro_Producto);
        //validacion de montaje
        res.render('links/Producto', { Query })
    } else {
        res.render('links/Producto')

    }
});

router.get('/ProductoPlantilla/:id', async(req, res, next) => {
    const Nro_Producto = req.params.id;
    console.log(Nro_Producto);
    const diseñador = await pool.query("select primer_nombre,primer_apellido from diseñadores as dis where dis.numero_diseñador = (select dp.num_diseñador from d_p as dp where dp.id_producto = ? )", Nro_Producto);
    console.log("Disenador ==== ", diseñador);
    const Query = await pool.query("Select * from Producto where id_producto = ?", Nro_Producto);
    res.render('links/productoPlantilla', { Query });
})

//ELIMINAR PRODUCTO
router.get('/delete/:id_producto', async(req, res, next) => {
    console.log("Entrando a borrar producto");
    const id_Producto = req.params.id_producto;
    await pool.query("DELETE FROM producto where id_producto = ?", [id_Producto]);
    res.render('links/Producto');
});

//---------------------------------------------PROCEDIMIENTOS DE CATEGORIAS

//BUSQUEDA DE UNA CATEGORIA
router.get('/Categoria/Buscar', async(req, res) => {
    var categoria = req.query;
    if (Object.keys(categoria).length !== 0) {
        var idcategoria = categoria.Categoria;
        const Query = await pool.query("Select * from categoria where Id_categoria = ? ", idcategoria);
        console.log(Query)
            // el res. render estaba asi  res.render('/links/Categoria', { Query }); y era asi como lo puse abajo
        res.render('links/Categoria', { Query });
    } else {
        res.render('links/Categoria')

    }
    //res.render('/links/Categoria',{Query});
})

//ELIMIMAR CATEGORIA 
router.get('/Borrar/:id_categoria'), async(req, res, next) => {
    console.log("Entrando a borrar categoria");
    const id_Categoria = req.params.id_producto;
    await pool.query("DELETE FROM categoria where id_categoria = ?", [id_Categoria])
    res.render('/links/Categoria');
}



//---------------------------------------------REDIRECCCIONAMIENTOS DEL FRONT

router.get('/adornosDeNavidad', async(req, res, next) => {
    res.render('links/adornosDeNavidad');
})

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

router.get('/adornosDeNavidadEs', async(req, res, next) => {
    res.render('links/adornosDeNavidadEs');
})

router.get('/Tienda', async(req, res, next) => {
    res.render('links/Tienda');
})

router.get('/tiendas/indexFixAsturias', async(req, res, next) => {
    res.render('links/tiendas/indexFixAsturias');
})

router.get('/tiendas/indexFixMadrid', async(req, res, next) => {
    res.render('links/tiendas/indexFixMadrid');
})

router.get('/tiendas/indexFixMurcia', async(req, res, next) => {
    res.render('links/tiendas/indexFixMurcia');
})

router.get('/tiendas/indexFixAndalucia', async(req, res, next) => {
    res.render('links/tiendas/indexFixAndalucia');
})

router.get('/tiendas/indexFixCataluna', async(req, res, next) => {
    res.render('links/tiendas/indexFixCataluna');
})



module.exports = router;