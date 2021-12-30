CREATE Database base_de_datos;

use base_de_datos;

CREATE TABLE afiliacion (
  `Numero_afiliado` MEDIUMINT(3) NOT NULL,
  `Descuento` SMALLINT(2) NOT NULL,
  `Años_de_Afiliacion` SMALLINT(12) NOT NULL,
  CONSTRAINT Afiliacion_PK PRIMARY KEY (Numero_afiliado)
);

CREATE TABLE lugar_geo (
  `codigo` SMALLINT(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `codigop` SMALLINT(2),
   CONSTRAINT lugar_geo_pk PRIMARY KEY (codigo) ,
   CONSTRAINT FK1_lugar_geo FOREIGN KEY(codigop) references lugar_geo (codigo)
);
alter table lugar_geo add CONSTRAINT Check_lugar CHECK((tipo='pais')or (tipo='ciudad')or(tipo = 'estado'));

CREATE TABLE tienda (
  `id_tienda` SMALLINT(2) NOT NULL,
  `nombre_sucursal` varchar(12) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `fecha_apertura` date NOT NULL,
  `horario` time(6) NOT NULL,
  `estilo_arquitectonico` varchar(12) NOT NULL,
  `tamaño` MEDIUMINT(3) NOT NULL,
  `numero_pasillos` SMALLINT(2) NOT NULL,
  `capacidad_almacenmiento` int(3) NOT NULL,
  `cantidad_productos` int(3) NOT NULL,
  `area_de_niños` boolean NOT NULL,
  `codigo_lugar_geo` SMALLINT(2) NOT NULL,
   CONSTRAINT tienda_pk PRIMARY KEY (id_tienda),
   CONSTRAINT FK1_tienda FOREIGN KEY(codigo_lugar_geo)references lugar_geo (codigo)
);

CREATE TABLE menu (
  `id_menu` SMALLINT(2) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date NOT NULL,
  `Precio` FLOAT(2) NOT NULL,
  `Id_tienda` SMALLINT(2) NOT NULL,
   CONSTRAINT Menu_PK PRIMARY KEY (id_menu),
   CONSTRAINT Fk1_Menu FOREIGN KEY (Id_tienda)references tienda (id_tienda)
);

CREATE TABLE platillo (
  `numero_plato` SMALLINT(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10),
  `id_menu` SMALLINT(2) NOT NULL,
  CONSTRAINT Platillo_PK PRIMARY KEY (numero_plato),
  CONSTRAINT FK1_platillo FOREIGN KEY (id_menu) references menu(id_menu)
);

CREATE TABLE diseñadores (
  `numero_diseñador` SMALLINT(2) NOT NULL,
  `primer_nombre` varchar(12) NOT NULL,
  `segundo_nombre` varchar(12),
  `primer_apellido` varchar(12) NOT NULL,
  `segundo_apellido` varchar(12) NOT NULL,
   CONSTRAINT diseñadores_pk PRIMARY KEY (numero_diseñador)
);

CREATE TABLE evento (
  `ID` SMALLINT(2) NOT NULL,
  `fecha_inicio` date,
  `fecha_fin` date NOT NULL,
  `Nombre del evento` varchar(15)NOT NULL,
  `tematica` varchar(15 )NOT NULL,
  `Descripcion` varchar(30)NOT NULL,
  `Id_tienda` SMALLINT(2)NOT NULL,
   CONSTRAINT ID_PK_Evento PRIMARY KEY (ID) ,
   CONSTRAINT FK1_evento FOREIGN KEY(Id_tienda) references tienda (id_tienda)
);

CREATE TABLE oferta (
  `Idoferta` SMALLINT(2) NOT NULL,
  `Nombre_oferta` varchar(15) NOT NULL,
  `Descuento` SMALLINT(2) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date,
  `Id_tiend_Oferta` SMALLINT(2) NOT NULL,  
   CONSTRAINT Oferta_PK PRIMARY KEY (IDOferta) ,
   CONSTRAINT FK1_oferta FOREIGN KEY(Id_tiend_Oferta) references tienda (id_tienda)
);


CREATE TABLE cliente (
  `DocIdentidad` int(8) NOT NULL,
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12),
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Fecha_nac` date NOT NULL,
  `Numero_afiliacion` MEDIUMINT(3),  
   CONSTRAINT Cliente_PK PRIMARY KEY (DocIdentidad) ,
   CONSTRAINT FK1_cliente FOREIGN KEY(Numero_afiliacion) references afiliacion (Numero_afiliado)
);

CREATE TABLE instrumento_pago (
  `Id_MetodoPago` SMALLINT(1) NOT NULL,
  `Tipo` varchar(10) NOT NULL,
  `Doc_identidad` int(8) NOT NULL,
   CONSTRAINT instrumento_pago_PK PRIMARY KEY (id_MetodoPago),
   CONSTRAINT FK1_Pago FOREIGN KEY(Doc_identidad) references cliente(DocIdentidad)
);
alter table Instrumento_pago add CONSTRAINT Check_lugar CHECK((tipo='Tarjeta')or (tipo='Digital')or(tipo = 'Efectivo'));

CREATE TABLE hijo(
  `ID_hijo` SMALLINT(2) NOT NULL,
  `Fecha_naciemto` date NOT NULL, 
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12),
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Cedula` int(8), 
  `Genero` varchar(1) NOT NULL, 
  `DocIdentidad` int(8) NOT NULL,
   CONSTRAINT Hijo_PK PRIMARY KEY (ID_hijo) ,
   CONSTRAINT FK1_hijo FOREIGN KEY(DocIdentidad) references cliente (DocIdentidad)
);
alter table hijo add CONSTRAINT Check_Genero CHECK((Genero='M')or (Genero='F'));


CREATE TABLE categoria   (
  `Id_categoria` SMALLINT(2) NOT NULL,
  `Nombre` varchar(12) NOT NULL,
  `Descripcion` varchar(20) NOT NULL,
  `Id_categoria_Padre` SMALLINT(2),
   CONSTRAINT Categoria_PK PRIMARY KEY (Id_categoria) ,
   CONSTRAINT Fk_categoria FOREIGN KEY(Id_categoria_Padre) references categoria (Id_categoria)
);

CREATE TABLE producto (
  `id_producto` MEDIUMINT(3) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `Precio` FLOAT(2) NOT NULL,
  `Caracteristicas` varchar(30) NOT NULL,
  `Instrucciones de uso` varchar(40) NOT NULL,
  `Materiales` varchar(30) NOT NULL,
  `Montaje` boolean NOT NULL,
  `Id_categoriaP` SMALLINT(2) NOT NULL,
  `Cantidad` int(3) NOT NULL,
   CONSTRAINT PK_Producto PRIMARY KEY (id_producto),
   CONSTRAINT Fk1_producto FOREIGN KEY(Id_categoriaP)references categoria (Id_categoria)
);


CREATE TABLE Telefono (
  `Codigo` SMALLINT(2) NOT NULL,
  `Numero de area`  MEDIUMINT(3) NOT NULL,
  `Numero`  int(7) NOT NULL,
  `id_tienda` SMALLINT(2),
  `DocIdentidad` int(8),
   CONSTRAINT Telf_PK PRIMARY KEY (Codigo),
   CONSTRAINT Fk1_Telefono FOREIGN KEY (id_tienda) references tienda (id_tienda),
   CONSTRAINT Fk2_Telefono FOREIGN KEY (DocIdentidad) references cliente(DocIdentidad)
);


CREATE TABLE oferta_categoria (
  `id_cat` SMALLINT(2) NOT NULL,
  `Id_oferta`  SMALLINT(2) NOT NULL,
  `Fecha_inicio`date NOT NULL,
  `Fecha_fin` date NOT NULL,
   CONSTRAINT O_C_PK PRIMARY KEY (Fecha_inicio),
   CONSTRAINT Fk1_Cat FOREIGN KEY (id_cat) references categoria(Id_categoria),
   CONSTRAINT Fk2_Oferta FOREIGN KEY (Id_oferta) references oferta(Idoferta)
);

CREATE TABLE catalogo_producto (
  `id_producto` MEDIUMINT(3) NOT NULL,
  `Codigo_Pais` SMALLINT(2) NOT NULL,
  `Fecha_añadido` date NOT NULL,
  `Fecha_Agotado` date,
  `precio`  FLOAT(2) NOT NULL,
   CONSTRAINT Catalogo_Producto_PK PRIMARY KEY (Fecha_añadido),
   CONSTRAINT Fk1_Catalogo_Producto FOREIGN KEY (id_producto) references producto(id_producto),
   CONSTRAINT Fk2_Catalogo_Producto FOREIGN KEY (Codigo_Pais) references lugar_geo(codigo)
);

CREATE TABLE P_C (
  `id_producto` MEDIUMINT(3) NOT NULL,
  `id_categoria` SMALLINT(2) NOT NULL,
   CONSTRAINT Fk1_producto_categoria FOREIGN KEY (id_producto) references producto(id_producto),
   CONSTRAINT Fk2_producto_categoria FOREIGN KEY (id_categoria) references categoria(id_categoria)
);

CREATE TABLE D_P (
  `id_producto` MEDIUMINT(3) NOT NULL,
  `num_diseñador` SMALLINT(2) NOT NULL,
   CONSTRAINT Fk1_D_P FOREIGN KEY (id_producto) references producto(id_producto),
   CONSTRAINT Fk2_D_P FOREIGN KEY (num_diseñador) references diseñadores(numero_diseñador)
);

CREATE TABLE P1_P2 (
  `id_producto` MEDIUMINT(3) NOT NULL,
  `id_producto1` MEDIUMINT(3) NOT NULL,
   CONSTRAINT Fk1_P1_P2 FOREIGN KEY (id_producto) references producto(id_producto),
   CONSTRAINT Fk2_P1_P2 FOREIGN KEY (id_producto1) references producto(id_producto)
);

CREATE TABLE C1_C2 (
  `id_categoria` SMALLINT(2) NOT NULL,
  `id_categoria1` SMALLINT(2) NOT NULL,
   CONSTRAINT Fk1_C1_C2 FOREIGN KEY (id_categoria) references categoria(id_categoria),
   CONSTRAINT Fk2_C1_C2 FOREIGN KEY (id_categoria1) references categoria(id_categoria)
);

CREATE TABLE caja (
  `numero_caja` SMALLINT(2) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `Id_tienda` SMALLINT(2) NOT NULL,
  CONSTRAINT Caja_PK PRIMARY KEY (numero_caja),
  CONSTRAINT Fk1_Caja FOREIGN KEY (Id_tienda) references tienda (id_tienda)
);

CREATE TABLE pago_anual (
  `Año` int(4) NOT NULL,
  `numero_afiliado` MEDIUMINT(3) NOT NULL,
   CONSTRAINT pago_anual_PK PRIMARY KEY (Año),
   CONSTRAINT Fk1_pago_anual FOREIGN KEY (numero_afiliado) references afiliacion (Numero_afiliado)
);

CREATE TABLE horario (
  `Id` SMALLINT(2) NOT NULL,
  `Dia` varchar(9) NOT NULL,
  `hora_inicio` time(2) NOT NULL,
  `hora_fin` time(2) NOT NULL,
  `codigo_pais` SMALLINT(2) NOT NULL,
   CONSTRAINT horario_PK PRIMARY KEY (Id),
   CONSTRAINT Fk1_horario FOREIGN KEY (codigo_pais) references lugar_geo (codigo)
);

CREATE TABLE factura (
  `numero_factura` int(6) NOT NULL,
  `monto` float NOT NULL,
  `fecha_emision` date NOT NULL,
  `forma_pago` SMALLINT(1) NOT NULL,
  `Doc_identidad` int(8) NOT NULL,
   CONSTRAINT factura_PK PRIMARY KEY (numero_factura),
   CONSTRAINT Fk1_factura FOREIGN KEY (forma_pago) references instrumento_pago (Id_MetodoPago),
   CONSTRAINT FK2_factura FOREIGN KEY (Doc_identidad) references cliente(DocIdentidad)
);

CREATE TABLE detalle_factura (
  `id_renglon` int(6) NOT NULL,
  `cantidad` float NOT NULL,
  `numero_factura` int(6) NOT NULL,
  `fecha_añadido` date NOT NULL,
   CONSTRAINT detalle_factura_PK PRIMARY KEY (id_renglon),
   CONSTRAINT Fk1_detalle_factura FOREIGN KEY (numero_factura) references factura (numero_factura),
   CONSTRAINT FK2_detalle_factura FOREIGN KEY(fecha_añadido) references catalogo_producto(Fecha_añadido)
);