CREATE TABLE afiliacion (
  `Numero_afiliado` SMALLINT(10) NOT NULL,
  `Descuento` SMALLINT(3) NOT NULL,
  `Años_de_Afiliacion` SMALLINT(12) NOT NULL,
  CONSTRAINT ID_PK_Afiliacion PRIMARY KEY (Numero_afiliado)
);

CREATE TABLE platillo (
  `numero_plato` SMALLINT(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10),
  CONSTRAINT ID_PK_Platillo PRIMARY KEY (numero_plato)
);

CREATE TABLE diseñadores (
  `numero_diseñador` SMALLINT(2) NOT NULL,
  `primer_nombre` varchar(12) NOT NULL,
  `segundo_nombre` varchar(12),
  `primer_apellido` varchar(12) NOT NULL,
  `segundo_apellido` varchar(12) NOT NULL,
   CONSTRAINT diseñadores_pk PRIMARY KEY (numero_diseñador)
);

CREATE TABLE lugar_geo (
  `codigo` SMALLINT(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `codigop` SMALLINT(2),
   CONSTRAINT lugar_geo_pk PRIMARY KEY (codigo) ,
   CONSTRAINT codigop FOREIGN KEY(codigop) references lugar_geo (codigo)
);
alter table lugar_geo add CONSTRAINT Check_lugar CHECK((tipo='pais')or (tipo='ciudad')or(tipo = 'estado'));

CREATE TABLE tienda (
  `id_tienda` SMALLINT(2) NOT NULL,
  `nombre_sucursal` varchar(12) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `fecha_apertura` date NOT NULL,
  `horario` time(6) NOT NULL,
  `estilo_arquitectonico` varchar(12) NOT NULL,
  `tamaño` int(3) NOT NULL,
  `numero_pasillos` SMALLINT(2) NOT NULL,
  `capacidad_almacenmiento` int(3) NOT NULL,
  `cantidad_productos` int(3) NOT NULL,
  `area_de_niños` boolean NOT NULL,
  `codigo_lugar_geo` SMALLINT(2) NOT NULL,
   CONSTRAINT tienda_pk PRIMARY KEY (id_tienda),
   CONSTRAINT codigo_lugar_geo FOREIGN KEY(codigo_lugar_geo)references lugar_geo (codigo)
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
   CONSTRAINT ID_TIENDA_FK FOREIGN KEY(Id_tienda) references tienda (id_tienda)
);
CREATE TABLE Oferta (
  `IDOferta` SMALLINT(2) NOT NULL,
  `Nombre_oferta` varchar(15) NOT NULL,
  `Descuento` SMALLINT(3) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date,
  `Id_tiend_Oferta` SMALLINT(2) NOT NULL,  
   CONSTRAINT ID_PK_Oferta PRIMARY KEY (IDOferta) ,
   CONSTRAINT ID_TIENDA_FKO FOREIGN KEY(Id_tiend_Oferta) references tienda (id_tienda)
);


CREATE TABLE Cliente (
  `DodIdentidad` SMALLINT(8) NOT NULL,
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12),
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Fecha_nac` date NOT NULL,
  `Numero_afiliacion` SMALLINT(2),  
   CONSTRAINT ID_PK_Cliente PRIMARY KEY (DodIdentidad) ,
   CONSTRAINT ID_Cliente_FK FOREIGN KEY(Numero_afiliacion) references afiliacion (Numero_afiliado)
);

CREATE TABLE Instrumento_pago (
  `id_MetodoPago` SMALLINT(1) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `Doc_identidad` SMALLINT(8) NOT NULL,
   CONSTRAINT ID_PK_instrumento_pago PRIMARY KEY (id_MetodoPago),
   CONSTRAINT ID_Cliente_FKPago FOREIGN KEY(Doc_identidad) references Cliente(DodIdentidad)
);
alter table Instrumento_pago add CONSTRAINT Check_lugar CHECK((tipo='Tarjeta')or (tipo='Digital')or(tipo = 'Efectivo'));

CREATE TABLE Hijo(
  `ID_hijo` SMALLINT(2) NOT NULL,
  `Año_naciemto` SMALLINT(4) NOT NULL, 
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12),
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Cedula` SMALLINT(8), 
  `Genero` varchar(1) NOT NULL, 
  `DocIdentidad` SMALLINT(8) NOT NULL,
   CONSTRAINT ID_PK_Hijo PRIMARY KEY (ID_hijo) ,
   CONSTRAINT ID_Hijo_FK FOREIGN KEY(DocIdentidad) references Cliente (DodIdentidad)
);
alter table Hijo add CONSTRAINT Check_Genero CHECK((Genero='M')or (Genero='F'));


CREATE TABLE Categoria   (
  `Id_categoria` SMALLINT(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `Descripcion` varchar(10) NOT NULL,
  `Id_categoria_Padre` SMALLINT(2),
   CONSTRAINT Categoria_PK PRIMARY KEY (Id_categoria) ,
   CONSTRAINT Fk_categoria FOREIGN KEY(Id_categoria_Padre) references Categoria (Id_categoria)
);

CREATE TABLE Producto (
  `Numero_producto` INT(9) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `Precio` FLOAT(2) NOT NULL,
  `Caracteristicas` varchar(30) NOT NULL,
  `Instrucciones de uso` varchar(40) NOT NULL,
  `Materiales` varchar(30) NOT NULL,
  `Montaje` boolean NOT NULL,
  `Id_categoriaP` SMALLINT(2) NOT NULL,
   CONSTRAINT Producto_PK PRIMARY KEY (Numero_producto),
   CONSTRAINT Fk_categoria_PROD FOREIGN KEY(Id_categoriaP)references Categoria (Id_categoria)
);


CREATE TABLE Menu (
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date,
  `Precio` FLOAT(2) NOT NULL,
  `Id_tienda` SMALLINT(2) NOT NULL,
  `Numero_plato` SMALLINT(2) NOT NULL,
   CONSTRAINT Menu_PK PRIMARY KEY (Fecha_inicio),
   CONSTRAINT Fk1_Menu FOREIGN KEY (Id_tienda)references tienda (id_tienda),
   CONSTRAINT Fk2_Menu FOREIGN KEY (Numero_plato) references platillo(numero_plato)
);


CREATE TABLE Telefono (
  `Codigo` SMALLINT(3) NOT NULL,
  `Numero de area`  SMALLINT(3) NOT NULL,
  `NUMERO`  SMALLINT(4) NOT NULL,
  `id_tiendat` SMALLINT(2),
  `DocIdentidadT` SMALLINT(8),
   CONSTRAINT Telf_PK PRIMARY KEY (Codigo),
   CONSTRAINT Fk1_Telefono FOREIGN KEY (id_tiendat) references tienda (id_tienda),
   CONSTRAINT Fk2_Telefono FOREIGN KEY (DocIdentidadT) references Cliente(DodIdentidad)
);


CREATE TABLE Oferta_Categoria (
  `id_cat` SMALLINT(2) NOT NULL,
  `Id_oferta1`  SMALLINT(2) NOT NULL,
  `Fecha_inicio`date NOT NULL,
  `Fecha_fin` date NOT NULL,
   CONSTRAINT O_F_PK PRIMARY KEY (Fecha_inicio),
   CONSTRAINT Fk1_Cat FOREIGN KEY (id_cat) references Categoria(Id_categoria),
   CONSTRAINT Fk2_Oferta FOREIGN KEY (Id_oferta1) references Oferta(IDOferta)
);

CREATE TABLE Catalogo_Producto (
  `id_producto`  INT(9) NOT NULL,
  `Codigo_Pais` SMALLINT(2) NOT NULL,
  `Fecha_añadido` date NOT NULL,
  `Fecha_Agotado` date,
  `precio`  FLOAT(2) NOT NULL,
   CONSTRAINT C_P_PK PRIMARY KEY (Fecha_añadido),
   CONSTRAINT Fk1_C_P FOREIGN KEY (id_producto) references Producto(Numero_producto),
   CONSTRAINT Fk2_C_P FOREIGN KEY (Codigo_Pais) references lugar_geo(codigo)
);

