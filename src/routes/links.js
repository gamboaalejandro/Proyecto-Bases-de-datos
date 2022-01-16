const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');

//------------------------------------------------------PROCEDIMIENTOS DE PRODUCTOS   

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
        res.render('links/Categoria', { Query });
    } else {
        res.render('links/Categoria')

    }
})


//AÑADIR CATEGORIA
router.get('/CategoriaGuardar', async(req, res, next) => {
    res.render('links/Categoriaanadir');
});

router.post('/CategoriaGuardar', async(req, res, next) => {
    const varr = req.body;
    if ((varr.Id_Categoria !== "") && (varr.Nombre !== "") && (varr.Descripcion !== "")) {
        //req.flash('success', 'Producto Insertado satisfactoriamente');
        await pool.query("INSERT into categoria set ? ", {
            Id_Categoria: varr.Id_categoria,
            Nombre: varr.Nombre,
            Descripcion: varr.Descripcion,
            Id_categoria_Padre: varr.Id_categoria_Padre
        }); 
    } else {
        // usar libreria pop up 
        res.send("ta malo maldita");
    }
    res.render('links/Categoria');
});

//MODIFICAR CATEGORIA
router.get('/modificarc/:Id_categoria', async(req, res, next) => {
    var categoria = req.params.Id_categoria;      
    console.log("sexo");
    const Query = await pool.query("Select * from categoria where Id_categoria = ? ", categoria);
    console.log(Query);
    res.render('links/Categoriamodificar', { Query: Query[0] })
})

router.post('/modificarc', async(req, res, next) => {
    const varr = req.body;
    const categoria = {
        Id_Categoria: varr.Id_categoria,
        Nombre: varr.Nombre, 
        Descripcion: varr.Descripcion,
        Id_categoria_Padre: varr.Id_categoria_Padre
    }   
    console.log(categoria);
    if ((varr.Id_categoria !== "") && (varr.Nombre !== "") && (varr.Descripcion !== "") && (varr. Id_categoria_Padre !== "")) {
        console.log("MODIFICAR CATEGORIA");
        await pool.query("UPDATE categoria set ? WHERE Id_categoria = ? ", [categoria, varr.Id_categoria]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Categoria');
    } else {
        // usar libreria pop up mensaje  que ta malo  aqui se usa el flash pero toy cansao asi que xd
        res.send("ta malo ");
    }
})

//ELIMINAR CATEGORIA 
router.get('/Borrar/:Id_categoria'), async(req, res, next) => {
    console.log("Entrando a borrar categoria");
    const id_Categoria = req.params.Id_categoria;
    await pool.query("DELETE FROM categoria where Id_categoria = ?", id_Categoria)
    res.render('/links/Categoria');
}

//------------------------------------------------------PROCEDIMIENTOS DE TIENDAS

//BUSCAR TIENDAS
router.get('/Tienda', async(req, res, next) => {
    var tienda2=req.query;
    console.log("daa0",req.query);
    if (Object.keys(tienda2).length !== 0) {
        var id_tienda = tienda2.Tienda;
        const Query = await pool.query("Select * from tienda where id_tienda = ? ", id_tienda);
        console.log(Query);
        res.render('links/Tienda', {Query})
    } else {
        console.log("NO ENTRO");
        res.render('links/Tienda')

    }
});

//AÑADIR TIENDAd
router.get('/TiendaGuardar', async(req, res, next) => {
    res.render('links/Tiendaanadir');
});

router.post('/TiendaGuardar', async(req, res, next) => {
    const varr = req.body;
    if ((varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.fecha_apertura !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamaño !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (arr.area_ninos !== "") && (varr.codigo_lugar_geo !== "")) {
        await pool.query("INSERT into tienda set ? ", {
            id_tienda: varr.id_tienda,
            nombre_sucursal: varr.nombre_sucursal,
            direccion: varr.direccion,
            fecha_apertura: varr.fecha_apertura,
            estilo_arquitectonico: varr.estilo_arquitectonico,
            tamaño: varr.tamaño,
            numero_pasillos: varr.numero_pasillos,
            capacidad_almacenamiento: varr.capacidad_almacenamiento,
            cantidad_productos: varr.cantidad_productos,
            area_ninos: varr.area_ninos,
            codigo_lugar_geo: varr.codigo_lugar_geo
        }); 
    } else {
        // usar libreria pop up 
        res.send("ta malo maldita");
    }
    res.render('links/Categoria');
});

//MODIFICAR TIENDA

router.get('/modificart/:id_tienda', async(req, res, next) => {
    var tienda = req.params.id_tienda;      
    const Query = await pool.query("Select * from tienda where id_tienda = ? ", tienda);
    console.log(Query);
    res.render('links/Tiendamodificar', { Query: Query[0] })
})

router.post('/modificart', async(req, res, next) => {
    const varr = req.body;
    const tienda = {
        id_tienda: varr.id_tienda,
        nombre_sucursal: varr.nombre_sucursal,
        direccion: varr.direccion,
        fecha_apertura: varr.fecha_apertura,
        estilo_arquitectonico: varr.estilo_arquitectonico,
        tamaño: varr.tamaño,
        numero_pasillos: varr.numero_pasillos,
        capacidad_almacenamiento: varr.capacidad_almacenamiento,
        cantidad_productos: varr.cantidad_productos,
        area_ninos: varr.area_ninos,
        codigo_lugar_geo: varr.codigo_lugar_geo
    }   
    console.log(tienda);
    if ((varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.fecha_apertura !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamaño !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (arr.area_ninos !== "") && (varr.codigo_lugar_geo !== "")) {
        console.log("MODIFICAR TIENDA");
        await pool.query("UPDATE tienda set ? WHERE id_tienda = ? ", [tienda, varr.id_tienda]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Tienda');
    } else {
        // usar libreria pop up mensaje  que ta malo  aqui se usa el flash pero toy cansao asi que xd
        res.send("ta malo ");
    }
})

//ELIMINAR TIENDA 
router.get('/Eliminar/:id_tienda'), async(req, res, next) => {
    console.log("Entrando a borrar tienda");
    const id_tienda = req.params.id_tienda;
    await pool.query("DELETE FROM tienda where id_tienda = ?", id_tienda)
    res.render('/links/Tienda');
}

//---------------------------------------------REDIRECCCIONAMIENTOS DEL FRONT

router.get('/ProductoPlantilla/:id', async(req, res, next) => {
    const Nro_Producto = req.params.id;
    console.log(Nro_Producto);
    const diseñador = await pool.query("select primer_nombre,primer_apellido from diseñadores as dis where dis.numero_diseñador = (select dp.num_diseñador from d_p as dp where dp.id_producto = ? )", Nro_Producto);
    console.log("Disenador ==== ", diseñador);
    const Query = await pool.query("Select * from Producto where id_producto = ?", Nro_Producto);
    res.render('links/productoPlantilla', { Query });
})

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

/* TIENDAS -----------------------------------------------------*/

/*ESPAÑA----------------------------*/
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

/*ESTADOS UNIDOS--------------------------------*/
router.get('/tiendas/indexFixVirginia', async(req, res, next) => {
    res.render('links/tiendas/indexFixVirginia');
})

router.get('/tiendas/indexFixCalifornia', async(req, res, next) => {
    res.render('links/tiendas/indexFixCalifornia');
})

router.get('/tiendas/indexFixFlorida', async(req, res, next) => {
    res.render('links/tiendas/indexFixFlorida');
})

/*MEXICO-------------------------------------------*/
router.get('/tiendas/indexFixCiudadMexico', async(req, res, next) => {
    res.render('links/tiendas/indexFixCiudadMexico');
})






module.exports = router;