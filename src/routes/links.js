const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require('../database');
const moment = require('moment');
const Query = require("mysql/lib/protocol/sequences/Query");
const { query } = require("express");
var mensaje = true;
var carrito = [];
var total = 0;
var cantidadTotal = 0;
var ofertageneral = [
    []
];
var ofertaespecifica = 0;
tienda = 0;

//------------------------------------------------------PROCEDIMIENTOS DE PRODUCTOS   
/*
function Facturacion(Monto, forma_pago, Doc_identidad, NumeroCaja) {
    const numero_factura = parseInt(getRandomArbitrary(0, 101)); //numero de factura generado aleatoreamente
    var actual = Date.now(); // Fecha actual
    var hoy = new Date(actual);
    pool.query(" insert into factura")
        //campos que se generan aqui numero_factura (aleatorio), fecha emision,
}*/
//BUSQUEDA DE UN PRODUCTO 

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

router.get('/eliminado/:id_tienda', (req, res) => {

});
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
        await pool.query("insert into p_c set ?", {
            id_producto: varr.id_producto,
            Id_categoria: varr.ID_Categoria
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
        Descripcion: varr.Descripcion

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
router.get('/borrar/:Id_categoria', async(req, res, next) => {
    var mensajito = "Categoria Eliminada exitosamente";
    const id_Categoria = req.params.Id_categoria;
    await pool.query("DELETE FROM categoria where Id_categoria = ?", id_Categoria)
    res.render('links/Categoria', { mensaje, mensajito });
})

//------------------------------------------------------PROCEDIMIENTOS DE TIENDAS

//BUSCAR TIENDAS
router.get('/Tienda', async(req, res, next) => {
    var tienda2 = req.query;
    if (Object.keys(tienda2).length !== 0) {
        var id_tienda = tienda2.Tienda;
        const telefono = await pool.query("Select Codigo, NumeroArea, Numero from telefono where id_tienda = ? ", id_tienda);
        const telffinal = "+" + String(telefono[0].NumeroArea) + "" + String(telefono[0].Numero);
        const Query = await pool.query("Select * from tienda where id_tienda = ? ", id_tienda);
        Query[0].fecha_apertura = moment(Query[0].fecha_apertura).format('YYYY-MM-DD');
        Query[0].telffinal = telffinal;
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
    if ((varr.telefonoTienda !== "") && (varr.telefonoCodigoArea !== "") && (varr.telefonoCodigo !== "") && (varr.capacidad_almacenamiento < varr.tamano) && (varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamano !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (varr.codigo_lugar_geo !== "")) {
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

        await pool.query("INSERT into telefono set ? ", {
            NumeroArea: varr.telefonoCodigoArea,
            Numero: varr.telefonoTienda,
            id_tienda: varr.id_tienda
        })

        res.render('links/Tienda', { mensaje, mensajito });
    } else {
        mensajito = "No es posible añadir la tienda";
        res.render('links/Tienda', { mensaje, mensajito });
    }

});

//MODIFICAR TIENDA

router.get('/modificart/:id_tienda', async(req, res, next) => {
    var tienda = req.params.id_tienda;
    const telefono = await pool.query("Select Codigo, NumeroArea, Numero from telefono where id_tienda = ? ", tienda);
    //const telffinal = "+" + String(telefono[0].Codigo) + "" + String(telefono[0].NumeroArea) + "" + String(telefono[0].Numero);
    const Query = await pool.query("Select * from tienda where id_tienda = ? ", tienda);
    Query[0].fecha_apertura = moment(Query[0].fecha_apertura).format('YYYY-MM-DD');
    Query[0].codigo = telefono[0].Codigo;
    Query[0].numeroarea = telefono[0].NumeroArea;
    Query[0].numero = telefono[0].Numero;
    res.render('links/Tiendamodificar', { Query: Query[0] })
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

    const telefono = {
        identificador: varr.id_tienda,
        Codigo: varr.telefonoCodigo,
        NumeroArea: varr.telefonoCodigoArea,
        Numero: varr.telefonoTienda
    }

    if ((varr.telefonoTienda !== "") && (varr.capacidad_almacenamiento < varr.tamano) && (varr.id_tienda !== "") && (varr.nombre_sucursal !== "") && (varr.direccion !== "") && (varr.estilo_arquitectonico !== "") && (varr.tamaño !== "") && (varr.numero_pasillos !== "") && (varr.capacidad_almacenamiento !== "") && (varr.cantidad_productos !== "") && (varr.codigo_lugar_geo !== "")) {
        console.log("MODIFICAR TIENDA");
        await pool.query("UPDATE tienda set ? WHERE id_tienda = ? ", [tienda, varr.id_tienda]);
        await pool.query("UPDATE telefono set ? where id_tienda = ? ", [telefono, varr.id_tienda]);
        //mensaje de que ta bueno *Flash esta disponible desde los request (req)
        res.render('links/Tienda', { mensaje, mensajito });
    } else {
        mensajito = "No es posible modificar la tienda";
        res.render('links/Tienda', { mensaje, mensajito });
    }
})

//ELIMINAR TIENDA  
router.get('/Eliminar/:id_tienda', async(req, res, next) => {
    var mensajito = "Tienda Eliminada exitosamente";
    console.log("Entrando a borrar tienda");
    const id_tienda = req.params.id_tienda;
    await pool.query("DELETE FROM tienda where id_tienda = ?", id_tienda);
    res.render('links/Tienda', { mensaje, mensajito });
});

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
    var cantidadsita = Number(Query[0].Cantidad);
    const str = "/img/productos/" + req.params.id_producto + "a.png"
    const str2 = "/img/productos/" + req.params.id_producto + "b.png"
    var cont = 0;
    Query[0].Cantidad = Number(req.query.Cantidad);
    //console.log(producto[0]);
    if (carrito.length === 0) {
        if (Number(req.query.Cantidad) <= cantidadsita) {
            carrito.push(Query[0]);
            cantidadTotal = cantidadTotal + Number(Query[0].Cantidad);
            console.log("anadio el primer producto");
            res.render('links/productoPlantilla', { Query, str, str2, mensajito });
        } else {
            mensajito = "Esa cantidad no se encuentra disponible, el carrito esta vacio";
            res.render('links/productoPlantilla', { Query, str, str2, mensajito });
        }
    } else {
        console.log("entro en el else");
        for (let i = 0; i < carrito.length; i++) {
            if ((carrito[i].id_producto === Number(req.params.id_producto))) {
                if (Number(req.query.Cantidad) <= cantidadsita) {
                    carrito[i].Cantidad = carrito[i].Cantidad + Number(req.query.Cantidad)
                }
                mensajito = "El producto ya se encuentra en el carrito, Cantidad actualizada"
                    //res.render('links/productoPlantilla', { Query, str, str2 });
                break;
            } else {
                cont++;
            }
        }
        console.log("carrito ", carrito);
        if ((cont === carrito.length)) {
            cantidadTotal = cantidadTotal + Number(Query[0].Cantidad);
            carrito.push(Query[0]);
        }
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

/*
ESPAÑA-- -- -- -- -- -- -- -- -- -- -- -- -- --*/
router.get('/tiendas/indexFixAsturias', async(req, res, next) => {
    tienda = 1;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixAsturias');
})

router.get('/tiendas/indexFixMadrid', async(req, res, next) => {
    tienda = 2;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixMadrid');
})

router.get('/tiendas/indexFixMurcia', async(req, res, next) => {
    tienda = 3;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixMurcia');
})

router.get('/tiendas/indexFixAndalucia', async(req, res, next) => {
    tienda = 4;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixAndalucia');
})

router.get('/tiendas/indexFixCataluna', async(req, res, next) => {
    tienda = 5;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixCataluna');
})

/*
ESTADOS UNIDOS-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --*/
router.get('/tiendas/indexFixVirginia', async(req, res, next) => {
    tienda = 6;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixVirginia');
})

router.get('/tiendas/indexFixCalifornia', async(req, res, next) => {
    tienda = 7;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixCalifornia');
})

router.get('/tiendas/indexFixFlorida', async(req, res, next) => {
    tienda = 8;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixFlorida');
})


/*MEXICO-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - */
router.get('/tiendas/indexFixCiudadMexico', async(req, res, next) => {

    tienda = 9;
    ofertaespecifica = await pool.query("select Descuento from oferta where Id_tienda = ? ", tienda);
    ofertageneral = await pool.query("select Descuento from oferta where Id_tienda IS NULL ");
    res.render('links/tiendas/indexFixCiudadMexico');
})

router.get('/carrito', async(req, res, next) => {
    console.log("el carrito bello", carrito);
    const productoOferta = await pool.query("select id_producto from p_c where id_categoria = (select id_categoria from oferta_categoria where Id_oferta = (Select Idoferta from oferta where Id_tienda =  ?))", tienda);
    const ofertafinal = await pool.query("select Idoferta from oferta where Id_tienda IS NULL");
    console.log(ofertafinal);
    console.log(productoOferta);
    for (let i = 0; i < carrito.length; i++) {
        for (let j = 0; j < productoOferta.length; j++) {
            if (carrito[i].id_producto === productoOferta[j].id_producto) {
                console.log(ofertaespecifica);
                console.log(carrito[i].Precio);
                carrito[i].Precio = ((Number(carrito[i].Precio)) * (ofertaespecifica[0].Descuento / 100)) * (Number(carrito[i].Cantidad));
                console.log(carrito[i].Precio);
            }
        }
        carrito[i].Precio = (Number(carrito[i].Precio)) * (Number(carrito[i].Cantidad));
        total = total + carrito[i].Precio;
    }
    res.render('links/carrito', { carrito, total, cantidadTotal });
})

router.get('/EliminaCarrito/:id_producto', (req, res) => {
    console.log("entro al eliminar ");
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i].id_producto);
        console.log(req.params.id_producto);
        if (Number(req.params.id_producto) === carrito[i].id_producto) {
            total = total - carrito[i].Precio;
            cantidadTotal = cantidadTotal - carrito[i].Cantidad;
            carrito.splice(i, 1);
        }
    }
    res.render("links/carrito", { carrito, total, cantidadTotal });
})

// Metodos de  factura 



router.get('/factura', async(req, res, next) => {
    var mensajito = "El cliente se encuentra afiliado"
    var afiliado = false;
    const cedula = Number(req.query.cedula);
    const clientico = await pool.query("Select * from cliente where DocIdentidad = ? ", cedula);
    if (clientico.length === 0) {
        res.render("links/factura", { carrito, total, cantidadTotal, cedula, ofertaespecifica });
    } else {
        const cueri = await pool.query("select DocIdentidad from afiliacion where DocIdentidad = ?", cedula);
        const ciudad = await pool.query("Select nombre from lugar_geo where codigo = ? ", clientico[0].Cod_ciudad);
        const telefono = await pool.query("Select Codigo, NumeroArea, Numero from telefono where DocIdentidad = ? ", cedula);
        const telffinal = "+" + String(telefono[0].NumeroArea) + "" + String(telefono[0].Numero);
        if (cueri.length === 0) {
            console.log("el carrito", carrito);
            res.render('links/factura', { cliente: clientico[0], ciudad: ciudad[0], telffinal, afiliado, carrito, total, cantidadTotal, ofertaespecifica });
        } else {
            afiliado = true;
            res.render('links/factura', { cliente: clientico[0], ciudad: ciudad[0], telffinal, afiliado, carrito, total, cantidadTotal, ofertaespecifica });
        }
    }

})

router.get('/afiliado', async(req, res) => {
    const cedula = Number(req.query.cedula);
    var afiliado = false;
    const clientela = await pool.query("Select * from cliente where DocIdentidad = ? ", cedula);
    while (!afiliado) {
        const numero_afiliado = parseInt(getRandomArbitrary(0, 101));
        const query = await pool.query("select Numero_afiliado from afiliacion where Numero_afiliado = ?", numero_afiliado);
        console.log("El query", query);
        if (query.length === 0) {
            console.log("entro al if");
            await pool.query(" INSERT INTO afiliacion set ?", {
                Numero_afiliado: numero_afiliado,
                Años_de_Afiliacion: 0,
                DocIdentidad: cedula
            });
            var mensajito = "El cliente ha sido afiliado"
            afiliado = true;
            const ciudad = await pool.query("Select nombre from lugar_geo where codigo = ? ", clientela[0].Cod_ciudad);
            const telefono = await pool.query("Select Codigo, NumeroArea, Numero from telefono where DocIdentidad = ? ", cedula);
            const telffinal = "+" + String(telefono[0].NumeroArea) + "" + String(telefono[0].Numero);
            console.log("logrado", clientela[0])
            console.log("Ciudad", ciudad);
            console.log("telefoono", telffinal);
            res.render("links/factura", { cliente: clientela[0], afiliado, ciudad: ciudad[0], telffinal, carrito, total, cantidadTotal, ofertaespecifica })
        }
    }

})

router.get('/Confirmacion/:cedula', async(req, res) => {
    console.log("esta agregaando");
    var actual = Date.now(); // Fecha actual
    var hoy = new Date(actual);
    var mensajito = "Compra realizada con éxito";
    hoy = moment(hoy).format('YYYY-MM-DD');
    // insercion de clientes
    await pool.query(" INSERT INTO cliente set ? ", {
        DocIdentidad: req.query.cedula,
        Primer_Nombre: req.query.primer_nombre,
        Segundo_Nombre: req.query.segundo_nombre,
        Primer_Apellido: req.query.primer_apellido,
        Segundo_Apellido: req.query.segundo_apellido,
        Fecha_nac: req.query.fecha,
        Cod_ciudad: req.query.direccion,
    })
    var numero_factura = 0;
    var numero = [];
    var repetido = true;
    while (repetido) {
        numero_factura = parseInt(getRandomArbitrary(0, 101)); //numero de factura generado aleatoreamente
        numero = await pool.query("SELECT numero_factura from factura where numero_factura = ?", numero_factura);
        if (numero.length === 0) {
            repetido = false;

        }
    }
    //Insercion de facturas
    await pool.query("insert into factura set ? ", {
        numero_factura: numero_factura,
        monto: total,
        fecha_emision: hoy,
        forma_pago: req.query.metodoPago,
        Doc_identidad: req.params.cedula,
        NumeroCaja: req.query.Caja
    });

    var idMetodoRepetido = true;
    var id_tipo = 0;
    var id_tipoConsulta = [];
    while (idMetodoRepetido) {
        id_tipo = parseInt(getRandomArbitrary(0, 101));
        id_tipoConsulta = await pool.query("select Id_metodo from metodo_de_pago where Id_metodo = ?", id_tipo);
        if (id_tipoConsulta.length === 0) {
            idMetodoRepetido = false;
        }
    }
    await pool.query("insert into metodo_de_pago set ?", {
        Id_metodo: id_tipo,
        tipo: req.query.metodoPago,
        DocIdentidad: req.params.cedula
    });

    var idCaja = 0;
    var idCajaMetodo = [];
    var cajaValida = true;
    while (cajaValida) {
        idCaja = parseInt(getRandomArbitrary(0, 101));
        idCajaMetodo = await pool.query("select numero_caja from caja where numero_caja = ?", idCaja);
        if (id_tipoConsulta.length === 0) {
            cajaValida = false;
        }
    }
    var direccion = await pool.query("select Cod_ciudad from cliente where DocIdentidad = ?", req.params.cedula)
    console.log(direccion);
    await pool.query("insert into caja set ?", {
        numero_caja: idCaja,
        Tipo: req.query.Caja,
        Id_tienda: direccion[0].Cod_ciudad
    });

    var fechita = new Date();
    var consulta = [];
    var cantidad = [];
    for (let i = 0; i < carrito.length; i++) {
        consulta = await pool.query("select codigo from lugar_geo where codigo = (select codigop from lugar_geo where codigo = ?)", Number(req.query.direccion));
        fechita = await pool.query("select Fecha_añadido from catalogo_producto where id_producto = ? AND Codigo_Pais = ? ", [Number(carrito[i].id_producto), Number(consulta[0].codigo)]);
        cantidad = await pool.query("select Cantidad from producto where id_producto = ? ", Number(carrito[i].id_producto));
        await pool.query("UPDATE producto set Cantidad = ? WHERE id_producto = ? ", [(cantidad[0].Cantidad - Number(carrito[i].Cantidad)), Number(carrito[i].id_producto)]);
        if ((cantidad[0].Cantidad - Number(carrito[i].Cantidad) === 0)) {
            await pool.query("UPDATE catalogo_producto set Fecha_Agotado = ? where id_producto= ? ", [hoy, Number(carrito[i].id_producto)]);
        }
        await pool.query(" INSERT INTO detalle_factura set ? ", {
            cantidad: Number(carrito[i].Cantidad),
            numero_factura: numero_factura,
            fecha_anadido: fechita[0].Fecha_añadido
        })
    }
    await pool.query("INSERT into telefono set ? ", {
        NumeroArea: req.query.codigoArea,
        Numero: req.query.telefono,
        DocIdentidad: req.query.cedula
    });
    carrito = [];
    total = 0;
    cantidadTotal = 0;
    res.render("links/indexFix", { mensajito });
})

router.get('/facturacion/:cedula', async(req, res) => {
    console.log("esta agregaando");
    var actual = Date.now(); // Fecha actual
    var hoy = new Date(actual);
    var mensajito = "Compra realizada con éxito";
    hoy = moment(hoy).format('YYYY-MM-DD');
    ////////
    var numero_factura = 0;
    var numero = [];
    var repetido = true;
    while (repetido) {
        numero_factura = parseInt(getRandomArbitrary(0, 101)); //numero de factura generado aleatoreamente
        numero = await pool.query("SELECT numero_factura from factura where numero_factura = ?", numero_factura);
        if (numero.length === 0) {
            repetido = false;

        }
    }
    //Insercion de facturas
    //console.log(req.query.metodoPago);
    await pool.query("insert into factura set ? ", {
        numero_factura: numero_factura,
        monto: total,
        fecha_emision: hoy,
        forma_pago: req.query.metodoPago,
        Doc_identidad: req.params.cedula,
        NumeroCaja: req.query.Caja
    });

    var idMetodoRepetido = true;
    var id_tipo = 0;
    var id_tipoConsulta = [];
    while (idMetodoRepetido) {
        id_tipo = parseInt(getRandomArbitrary(0, 101));
        id_tipoConsulta = await pool.query("select Id_metodo from metodo_de_pago where Id_metodo = ?", id_tipo);
        if (id_tipoConsulta.length === 0) {
            idMetodoRepetido = false;
        }
    }
    await pool.query("insert into metodo_de_pago set ?", {
        Id_metodo: id_tipo,
        tipo: req.query.metodoPago,
        DocIdentidad: req.params.cedula
    });
    var idCaja = 0;
    var idCajaMetodo = [];
    var cajaValida = true;
    while (cajaValida) {
        idCaja = parseInt(getRandomArbitrary(0, 101));
        idCajaMetodo = await pool.query("select numero_caja from caja where numero_caja = ?", idCaja);
        if (id_tipoConsulta.length === 0) {
            cajaValida = false;
        }
    }
    var direccion = await pool.query("select Cod_ciudad from cliente where DocIdentidad = ?", req.params.cedula)
    console.log(direccion);
    await pool.query("insert into caja set ?", {
        numero_caja: idCaja,
        Tipo: req.query.Caja,
        Id_tienda: direccion[0].Cod_ciudad
    });


    var fechita = new Date();
    var cliente = [];
    var consulta = [];
    var cantidad = [];
    for (let i = 0; i < carrito.length; i++) {
        cliente = await pool.query("select Cod_ciudad from cliente where DocIdentidad = ? ", req.params.cedula);
        // console.log(cliente[0].Cod_ciudad);
        consulta = await pool.query("select codigo from lugar_geo where codigo = (select codigop from lugar_geo where codigo = ?)", Number(cliente[0].Cod_ciudad));
        fechita = await pool.query("select Fecha_añadido from catalogo_producto where id_producto = ? AND Codigo_Pais = ? ", [Number(carrito[i].id_producto), Number(consulta[0].codigo)]);
        cantidad = await pool.query("select Cantidad from producto where id_producto = ? ", Number(carrito[i].id_producto));
        await pool.query("UPDATE producto set Cantidad = ? WHERE id_producto = ? ", [(cantidad[0].Cantidad - Number(carrito[i].Cantidad)), Number(carrito[i].id_producto)]);
        if ((cantidad[0].Cantidad - Number(carrito[i].Cantidad) === 0)) {
            await pool.query("UPDATE catalogo_producto set Fecha_Agotado = ? where id_producto= ? ", [hoy, Number(carrito[i].id_producto)]);
        }
        await pool.query(" INSERT INTO detalle_factura set ? ", {
            cantidad: Number(carrito[i].Cantidad),
            numero_factura: numero_factura,
            fecha_anadido: fechita[0].Fecha_añadido
        })

    }
    carrito = [];
    total = 0;
    cantidadTotal = 0;
    res.render("links/indexFix", { mensajito });
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


/*PAISES---------------------*/
router.get('/tiendas/indexFixEspana', (req, res) => {
    res.render("links/tiendas/indexFixEspana");
});
router.get('/tiendas/indexFixUSA', (req, res) => {
    res.render("links/tiendas/indexFixUSA");
});
router.get('/tiendas/indexFixMexico', (req, res) => {
    res.render("links/tiendas/indexFixMexico");
});

router.get("/Registro", (req, res) => {

})

router.get("/PrincipalFactura2", (req, res) => {
    var mensajito = "El carrito esta vacio";
    if (carrito.length !== 0)
        res.render("links/PrincipalFactura2", { carrito, total, cantidadTotal });
    else {
        res.render("links/carrito", { mensajito, total, cantidadTotal })
    }
})



module.exports = router;