const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');
const moment = require('moment');
var mensaje = true;
var carrito = [];
var id = [];
var ciudad = 0;

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
        res.render('links/Producto', )

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

    var mensajito = "Producto modificado exitosamente";
    const varr = req.body;
    const producto = {
        id_producto: varr.id_producto,
        nombre: varr.nombre,
        Precio: varr.precio,
        Caracteristicas: varr.caracteristicas,
        Materiales: varr.materiales,
        Montaje: varr.Montaje,
        Cantidad: varr.cantidad,
        Instrucciones: varr.instrucciones
    }
    console.log(producto);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.precio !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        await pool.query("UPDATE producto set ? WHERE id_producto = ? ", [producto, varr.id_producto]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Producto', { mensaje, mensajito });
    } else {
        mensajito = "El producto no pudo ser modificado";
        res.render('links/Producto', { mensaje, mensajito });
    }
})

//AÑADIR UN PRODUCTO 
router.get('/ProductoGuardar', async(req, res, next) => {
    res.render('links/ProductoGuardar');
});

router.post('/ProductoGuardar', async(req, res, next) => {

    var mensajito = "Producto añadido exitosamente";
    const varr = req.body;

    console.log(varr.Montaje);
    if ((varr.id_producto !== "") && (varr.Nombre !== "") && (varr.Precio !== "") && (varr.cantidad !== "") && (varr.materiales !== "") && (varr.Caracteristicas !== "") && (varr.Instrucciones !== "")) {
        console.log("-----post");
        await pool.query("INSERT into producto set ? ", {
            id_producto: varr.id_producto,
            nombre: varr.Nombre,
            Precio: varr.Precio,
            Caracteristicas: varr.Caracteristicas,
            Materiales: varr.materiales,
            Montaje: varr.Montaje,
            Cantidad: varr.cantidad,
            Instrucciones: varr.Instrucciones

        });
        res.render('links/Producto', { mensaje, mensajito });
    } else {
        mensajito = "No es posible añadir el producto";
        res.render('links/Producto', { mensaje, mensajito });
    }


});

//ELIMINAR PRODUCTO
router.get('/delete/:id_producto', async(req, res, next) => {

    var mensajito = "Producto Eliminado exitosamente";
    console.log("Entrando a borrar producto");
    const id_Producto = req.params.id_producto;
    await pool.query("DELETE FROM producto where id_producto = ?", [id_Producto]);
    res.render('links/Producto', { mensaje, mensajito });
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

    var mensajito = "Categoria añadida exitosamente";
    const varr = req.body;
    if ((varr.Id_Categoria !== "") && (varr.Nombre !== "") && (varr.Descripcion !== "")) {
        //req.flash('success', 'Producto Insertado satisfactoriamente');
        await pool.query("INSERT into categoria set ? ", {
            Id_Categoria: varr.Id_categoria,
            Nombre: varr.Nombre,
            Descripcion: varr.Descripcion,
            Id_categoria_Padre: varr.Id_categoria_Padre
        });
        res.render('links/Categoria', { mensaje, mensajito });
    } else {
        mensajito = "No es posible añadir la categoria";
        res.render('links/Categoria', { mensaje, mensajito });
    }

});

//MODIFICAR CATEGORIA
router.get('/modificarc/:Id_categoria', async(req, res, next) => {
    var categoria = req.params.Id_categoria;
    const Query = await pool.query("Select * from categoria where Id_categoria = ? ", categoria);
    console.log(Query);
    res.render('links/Categoriamodificar', { Query: Query[0] })
})

router.post('/modificarc', async(req, res, next) => {

    var mensajito = "Categoria Modificada exitosamente";
    const varr = req.body;
    const categoria = {
        Id_Categoria: varr.Id_categoria,
        Nombre: varr.Nombre,
        Descripcion: varr.Descripcion,
        Id_categoria_Padre: varr.Id_categoria_Padre
    }
    console.log(categoria);
    if ((varr.Id_categoria !== "") && (varr.Nombre !== "") && (varr.Descripcion !== "") && (varr.Id_categoria_Padre !== "")) {
        console.log("MODIFICAR CATEGORIA");
        await pool.query("UPDATE categoria set ? WHERE Id_categoria = ? ", [categoria, varr.Id_categoria]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Categoria', { mensaje, mensajito });
    } else {
        mensajito = "No es posible modificar la categoria";
        res.render('links/Categoria', { mensaje, mensajito });
    }
})

//ELIMINAR CATEGORIA 
router.get('/Borrar/:Id_categoria'), async(req, res, next) => {

    var mensajito = "Categoria Eliminada exitosamente";
    const id_Categoria = req.params.Id_categoria;
    await pool.query("DELETE FROM categoria where Id_categoria = ?", id_Categoria)
    res.render('/links/Categoria', { mensaje, mensajito });
}

//------------------------------------------------------PROCEDIMIENTOS DE TIENDAS

//BUSCAR TIENDAS
router.get('/Tienda', async(req, res, next) => {
    var tienda2 = req.query;
    if (Object.keys(tienda2).length !== 0) {
        var id_tienda = tienda2.Tienda;
        const Query = await pool.query("Select * from tienda where id_tienda = ? ", id_tienda);
        console.log(Query)
        Query[0].fecha_apertura = moment(Query[0].fecha_apertura).format('YYYY-MM-DD');
        res.render('links/Tienda', { Query })
    } else {
        res.render('links/Tienda')

    }
});

//AÑADIR TIENDA
router.get('/TiendaGuardar', async(req, res, next) => {
    res.render('links/Tiendaanadir');
});

router.post('/TiendaGuardar', async(req, res, next) => {

    var mensajito = "Tienda añadida exitosamente";
    const varr = req.body;
    console.log(varr);
    if ((varr.capacidad_almacenamiento < varr.tamano) && (varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamano !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (varr.codigo_lugar_geo !== "")) {
        await pool.query("INSERT into tienda set ? ", {
            id_tienda: varr.id_tienda,
            nombre_sucursal: varr.nombre_sucursal,
            direccion: varr.direccion,
            fecha_apertura: varr.fecha_apertura,
            estilo_arquitectonico: varr.estilo_arquitectonico,
            tamano: varr.tamano,
            numero_pasillos: varr.numero_pasillos,
            capacidad_almacenmiento: varr.capacidad_almacenamiento,
            cantidad_productos: varr.cantidad_productos,
            area_de_ninos: varr.area,
            codigo_lugar_geo: varr.codigo_lugar_geo
        });
        res.render('links/Tienda', mensaje, mensajito);
    } else {
        mensajito = "No es posible añadir la tienda";
        res.render('links/Tienda', mensaje, mensajito);
    }

});

//MODIFICAR TIENDA

router.get('/modificart/:id_tienda', async(req, res, next) => {
    console.log("ENTRO AL MODIFICAR GET");
    var tienda = req.params.id_tienda;
    const Query = await pool.query("Select * from tienda where id_tienda = ? ", tienda);
    Query[0].fecha_apertura = moment(Query[0].fecha_apertura).format('YYYY-MM-DD');
    console.log(Query);
    console.log("SE VA A SALIR");
    res.render('links/Tiendamodificar', { Query: Query[0] })
        //res.render('links/Tienda',{Query});
})

router.post('/modificart/:id_tienda', async(req, res, next) => {

    var mensajito = "Tienda Modificada exitosamente";
    const varr = req.body;
    const tienda = {
        id_tienda: varr.id_tienda,
        nombre_sucursal: varr.nombre_sucursal,
        direccion: varr.direccion,
        fecha_apertura: varr.fecha_apertura,
        estilo_arquitectonico: varr.estilo_arquitectonico,
        tamano: varr.tamano,
        numero_pasillos: varr.numero_pasillos,
        capacidad_almacenmiento: varr.capacidad_almacenamiento,
        cantidad_productos: varr.cantidad_productos,
        area_de_ninos: varr.area,
        codigo_lugar_geo: varr.codigo_lugar_geo
    }

    console.log(tienda);
    if ((varr.capacidad_almacenamiento < varr.tamano) && (varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamaño !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (varr.codigo_lugar_geo !== "")) {
        console.log("MODIFICAR TIENDA");
        await pool.query("UPDATE tienda set ? WHERE id_tienda = ? ", [tienda, varr.id_tienda]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Tienda', { mensaje, mensajito });
    } else {
        mensajito = "No es posible modificar la tienda";
        res.render('links/Tienda', { mensaje, mensajito });
    }
})

//ELIMINAR TIENDA 
router.get('/Eliminar/:id_tienda'), async(req, res, next) => {
    var mensajito = "Tienda Eliminada exitosamente";
    console.log("Entrando a borrar tienda");
    const id_tienda = req.params.id_tienda;
    await pool.query("DELETE FROM tienda where id_tienda = ?", id_tienda)
    res.render('/links/Tienda', { mensaje, mensajito });
}

//---------------------------------------------REDIRECCCIONAMIENTOS DEL FRONT

router.get('/ProductoPlantilla/:id', async(req, res, next) => {
    const Nro_Producto = req.params.id;
    console.log(Nro_Producto);
    //const diseñador = await pool.query("select primer_nombre,primer_apellido from diseñadores as dis where dis.numero_diseñador = (select dp.num_diseñador from d_p as dp where dp.id_producto = ? )", Nro_Producto);
    //console.log("Disenador ==== ", diseñador);
    const Query = await pool.query("Select * from Producto where id_producto = ?", Nro_Producto);
    const str = "/img/productos/" + Nro_Producto + "a.png"
    const str2 = "/img/productos/" + Nro_Producto + "b.png"
    console.log(str);
    res.render('links/productoPlantilla', { Query, str, str2 });
})

router.get('/comprando/:id_producto', async(req, res) => {
    var mensajito = "Añadido correctamente";
    const Query = await pool.query("Select * from Producto where id_producto = ?", req.params.id_producto);
    const str = "/img/productos/" + req.params.id_producto + "a.png"
    const str2 = "/img/productos/" + req.params.id_producto + "b.png"
    var producto = await pool.query("Select * from producto where id_producto  = ?", req.params.id_producto);
    var cont = 0;
    var cantidadsita = Number(producto[0].Cantidad);
    console.log("cantidadsita", cantidadsita);
    producto[0].Cantidad = Number(req.query.Cantidad);
    //console.log(producto[0]);
    console.log("Cantidad", req.query.Cantidad);
    if (carrito.length === 0) {
        if (Number(req.query.Cantidad) <= cantidadsita) {
            carrito.push(producto[0]);
            console.log("anadio el primer producto");
            res.render('links/productoPlantilla', { Query, str, str2, mensajito });
        } else {
            mensajito = "Esa cantidad no se encuentra disponible, el carrito esta cvacio";
            res.render('links/productoPlantilla', { Query, str, str2, mensajito });
        }
    } else {
        console.log("entro en el else");
        for (let i = 0; i < carrito.length; i++) {
            console.log("carrito", carrito[i].id_producto);
            console.log("params", req.params.id_producto);
            if ((carrito[i].id_producto === Number(req.params.id_producto))) {
                if (Number(req.query.cantidad) <= cantidadsita) {
                    carrito[i].Cantidad = carrito[i].Cantidad + Number(req.query.Cantidad)
                }
                mensajito = "El producto ya se encuentra en el carrito, Cantidad actualizada"
                    //res.render('links/productoPlantilla', { Query, str, str2 });
                break;
            } else {
                cont++;
            }
        }
        console.log(carrito);
        console.log("se salio del for y este es el cont ", cont);
        if ((cont === carrito.length)) carrito.push(producto[0]);
        console.log("carrito ", carrito);
        res.render('links/productoPlantilla', { Query, str, str2, mensajito });
    }

})

router.get('/adornosDeNavidad', async(req, res, next) => {
    console.log(carrito);
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
    Pais =
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

router.get('/carrito', async(req, res, next) => {
    console.log(id);
    var carrito2 = [];
    var Cantidad = [];
    const Query = await pool.query("Select * from producto");
    console.log(Query);
    /*
    for (let i = 0; i < carrito.length; i++) {
        Query = await pool.query("Select * from producto where id_producto = ?", carrito[i].id_producto);
        console.log("el kueri", Query)
        carrito2.push(Query[i]);
    }*/

    //const factura = {}
    // for (let i = 0; i < carrito.length; i++) {
    //    const Query = await pool.query("Select id_producto, nombre, Precio from producto where id_producto = ? ", );
    // }
    console.log(carrito)
    res.render('links/carrito', { Query });
})

router.get('/factura', async(req, res, next) => {
    console.log(req.query);
    res.render('links/factura');
})

/* REDIRECT DE España*/
router.get('/adornosDeNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/adornosDeNavidad-Es");
});

router.get('/lucesNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/lucesNavidad-Es");
});
router.get('/comidaNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/comidaNavidad-Es");
});
router.get('/mantelesNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/mantelesNavidad-Es");
});
router.get('/arbolesNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/arbolesNavidad-Es");
});
router.get('/reposteriaNavidad-Es', (req, res) => {
    res.render("links/catalogoEs/reposteriaNavidad-Es");
});

router.get('/menuEs', (req, res) => {
    res.render("links/menu/menuEs");
});

router.get('/EventoAsturias', (req, res) => {
    res.render("links/eventos/eventoikeaAsturias");
});

router.get('/EventoAndalucia', (req, res) => {
    res.render("links/eventos/eventoikeaAndalucia");
});
router.get('/EventoCataluna', (req, res) => {
    res.render("links/eventos/eventoikeaCataluna");
});
router.get('/EventoMadrid', (req, res) => {
    res.render("links/eventos/eventoikeaMadrid");
});
router.get('/EventoMurcia', (req, res) => {
    res.render("links/eventos/eventoikeaMurcia");
});

/* REDIRECT DE USA*/

router.get('/adornosDeNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/adornosDeNavidad-Us");
});
router.get('/lucesNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/lucesNavidad-Us");
});
router.get('/comidaNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/comidaNavidad-Us");
});
router.get('/mantelesNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/mantelesNavidad-Us");
});
router.get('/arbolesNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/arbolesNavidad-Us");
});
router.get('/reposteriaNavidad-Us', (req, res) => {
    res.render("links/catalogoUs/reposteriaNavidad-Us");
});
router.get('/EventoCalifornia', (req, res) => {
    res.render("links/eventos/eventoikeaCalifornia");
});
router.get('/EventoFlorida', (req, res) => {
    res.render("links/eventos/eventoikeaFlorida");
});
router.get('/EventoVirginia', (req, res) => {
    res.render("links/eventos/eventoikeaVirginia");
});
router.get('/menuUs', (req, res) => {
    res.render("links/menu/menuUs");
});


/* REDIRECT DE MX*/

router.get('/adornosDeNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/adornosDeNavidad-Mx");
});
router.get('/lucesNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/lucesNavidad-Mx");
});
router.get('/comidaNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/comidaNavidad-Mx");
});
router.get('/mantelesNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/mantelesNavidad-Mx");
});
router.get('/arbolesNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/arbolesNavidad-Mx");
});
router.get('/reposteriaNavidad-Mx', (req, res) => {
    res.render("links/catalogoMx/reposteriaNavidad-Mx");
});
router.get('/menuMx', (req, res) => {
    res.render("links/menu/menuMx");
});
router.get('/EventoCiudadMexico', (req, res) => {
    res.render("links/eventos/eventoikeaCiudadMexico");
});


module.exports = router;