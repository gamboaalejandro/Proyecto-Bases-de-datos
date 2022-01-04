-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-01-2022 a las 03:18:32
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basesdedatos1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afiliacion`
--

CREATE TABLE `afiliacion` (
  `Numero_afiliado` mediumint(3) NOT NULL,
  `Descuento` smallint(2) NOT NULL,
  `Años_de_Afiliacion` smallint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `c1_c2`
--

CREATE TABLE `c1_c2` (
  `id_categoria` smallint(2) NOT NULL,
  `id_categoria1` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caja`
--

CREATE TABLE `caja` (
  `numero_caja` smallint(2) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `Id_tienda` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_producto`
--

CREATE TABLE `catalogo_producto` (
  `id_producto` mediumint(3) NOT NULL,
  `Codigo_Pais` smallint(2) NOT NULL,
  `Fecha_añadido` date NOT NULL,
  `Fecha_Agotado` date DEFAULT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `Id_categoria` smallint(2) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(120) NOT NULL,
  `Id_categoria_Padre` smallint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`Id_categoria`, `Nombre`, `Descripcion`, `Id_categoria_Padre`) VALUES
(1, 'Adornos de Navidad', 'ha llegado el momento de abrir la caja de los adornos de Navidad para volver a decorar nuestra casa.', NULL),
(2, 'Luces de Navidad', 'Llena de magia tu hogar con luces de Navidad', NULL),
(3, 'Comida navideña', 'Comida de Navidad para todas tus celebraciones', NULL),
(4, 'Manteles y textiles de Navidad', 'Manteles navideños que orquestan la decoración de tu mesa.', NULL),
(5, 'Árboles, macetas y plantas de Navidad', 'Puedes decorar las plantas de Navidad con adornos, guirnaldas y luces festivas para darle un toque personal.', NULL),
(6, 'Repostería de Navidad y moldes', 'Cajas y moldes para galletas de Navidad muy divertidos.', NULL),
(10, 'Adornos y decoraciones de árboles de Navidad', 'Llega el esperado momento de adornar el árbol.', 1),
(11, 'Velas navideñas y portavelas', 'Crea ambientes mágicos con velas de Navidad', 1),
(20, 'Iluminación decorativa para interior', 'Añade más brillo a tu hogar con guirnaldas de luces e iluminación interior.', 2),
(21, 'Iluminación decorativa para exterior', 'No hay nada tan acogedor para iluminar un espacio al aire libre como las luces decorativas exteriores.', 2),
(30, 'Cena de Navidad', 'Prepara tus cenas de Navidad con esta selección de productos.', 3),
(50, 'Árboles de Navidad y plantas', '¿El mejor árbol de Navidad decorado? El tuyo. ¡Elige tu estilo!', 5),
(51, 'Macetas navideñas, jarrones y floreros', 'Las macetas perfectas para tus flores de Navidad.', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `DocIdentidad` int(8) NOT NULL,
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12) DEFAULT NULL,
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Fecha_nac` date NOT NULL,
  `Numero_afiliacion` mediumint(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `id_renglon` int(6) NOT NULL,
  `cantidad` float NOT NULL,
  `numero_factura` int(6) NOT NULL,
  `fecha_añadido` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diseñadores`
--

CREATE TABLE `diseñadores` (
  `numero_diseñador` smallint(2) NOT NULL,
  `primer_nombre` varchar(12) NOT NULL,
  `segundo_nombre` varchar(12) DEFAULT NULL,
  `primer_apellido` varchar(12) NOT NULL,
  `segundo_apellido` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `d_p`
--

CREATE TABLE `d_p` (
  `id_producto` mediumint(3) NOT NULL,
  `num_diseñador` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `ID` smallint(2) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date NOT NULL,
  `Nombre del evento` varchar(15) NOT NULL,
  `tematica` varchar(15) NOT NULL,
  `Descripcion` varchar(30) NOT NULL,
  `Id_tienda` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `numero_factura` int(6) NOT NULL,
  `monto` float NOT NULL,
  `fecha_emision` date NOT NULL,
  `forma_pago` smallint(1) NOT NULL,
  `Doc_identidad` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hijo`
--

CREATE TABLE `hijo` (
  `ID_hijo` smallint(2) NOT NULL,
  `Fecha_naciemto` date NOT NULL,
  `Primer_Nombre` varchar(12) NOT NULL,
  `Segundo_Nombre` varchar(12) DEFAULT NULL,
  `Primer_Apellido` varchar(12) NOT NULL,
  `Segundo_Apellido` varchar(12) NOT NULL,
  `Cedula` int(8) DEFAULT NULL,
  `Genero` varchar(1) NOT NULL,
  `DocIdentidad` int(8) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `Id` smallint(2) NOT NULL,
  `Dia` varchar(9) NOT NULL,
  `hora_inicio` time(2) NOT NULL,
  `hora_fin` time(2) NOT NULL,
  `codigo_pais` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumento_pago`
--

CREATE TABLE `instrumento_pago` (
  `Id_MetodoPago` smallint(1) NOT NULL,
  `Tipo` varchar(10) NOT NULL,
  `Doc_identidad` int(8) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar_geo`
--

CREATE TABLE `lugar_geo` (
  `codigo` smallint(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `codigop` smallint(2) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id_menu` smallint(2) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date NOT NULL,
  `Precio` float NOT NULL,
  `Id_tienda` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `Idoferta` smallint(2) NOT NULL,
  `Nombre_oferta` varchar(15) NOT NULL,
  `Descuento` smallint(2) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date DEFAULT NULL,
  `Id_tiend_Oferta` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta_categoria`
--

CREATE TABLE `oferta_categoria` (
  `id_cat` smallint(2) NOT NULL,
  `Id_oferta` smallint(2) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p1_p2`
--

CREATE TABLE `p1_p2` (
  `id_producto` mediumint(3) NOT NULL,
  `id_producto1` mediumint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_anual`
--

CREATE TABLE `pago_anual` (
  `Año` int(4) NOT NULL,
  `numero_afiliado` mediumint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platillo`
--

CREATE TABLE `platillo` (
  `numero_plato` smallint(2) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `id_menu` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` mediumint(3) NOT NULL,
  `nombre` varchar(12) NOT NULL,
  `Precio` float NOT NULL,
  `Caracteristicas` varchar(30) NOT NULL,
  `Instrucciones de uso` varchar(40) NOT NULL,
  `Materiales` varchar(30) NOT NULL,
  `Montaje` tinyint(1) NOT NULL,
  `Id_categoriaP` smallint(2) NOT NULL,
  `Cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_c`
--

CREATE TABLE `p_c` (
  `id_producto` mediumint(3) NOT NULL,
  `id_categoria` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `Codigo` smallint(2) NOT NULL,
  `Numero de area` mediumint(3) NOT NULL,
  `Numero` int(7) NOT NULL,
  `id_tienda` smallint(2) DEFAULT NULL,
  `DocIdentidad` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_tienda` smallint(2) NOT NULL,
  `nombre_sucursal` varchar(12) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `fecha_apertura` date NOT NULL,
  `horario` time(6) NOT NULL,
  `estilo_arquitectonico` varchar(12) NOT NULL,
  `tamaño` mediumint(3) NOT NULL,
  `numero_pasillos` smallint(2) NOT NULL,
  `capacidad_almacenmiento` int(3) NOT NULL,
  `cantidad_productos` int(3) NOT NULL,
  `area_de_niños` tinyint(1) NOT NULL,
  `codigo_lugar_geo` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `afiliacion`
--
ALTER TABLE `afiliacion`
  ADD PRIMARY KEY (`Numero_afiliado`);

--
-- Indices de la tabla `c1_c2`
--
ALTER TABLE `c1_c2`
  ADD KEY `Fk1_C1_C2` (`id_categoria`),
  ADD KEY `Fk2_C1_C2` (`id_categoria1`);

--
-- Indices de la tabla `caja`
--
ALTER TABLE `caja`
  ADD PRIMARY KEY (`numero_caja`),
  ADD KEY `Fk1_Caja` (`Id_tienda`);

--
-- Indices de la tabla `catalogo_producto`
--
ALTER TABLE `catalogo_producto`
  ADD PRIMARY KEY (`Fecha_añadido`),
  ADD KEY `Fk1_Catalogo_Producto` (`id_producto`),
  ADD KEY `Fk2_Catalogo_Producto` (`Codigo_Pais`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`Id_categoria`),
  ADD KEY `Fk_categoria` (`Id_categoria_Padre`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`DocIdentidad`),
  ADD KEY `FK1_cliente` (`Numero_afiliacion`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`id_renglon`),
  ADD KEY `Fk1_detalle_factura` (`numero_factura`),
  ADD KEY `FK2_detalle_factura` (`fecha_añadido`);

--
-- Indices de la tabla `diseñadores`
--
ALTER TABLE `diseñadores`
  ADD PRIMARY KEY (`numero_diseñador`);

--
-- Indices de la tabla `d_p`
--
ALTER TABLE `d_p`
  ADD KEY `Fk1_D_P` (`id_producto`),
  ADD KEY `Fk2_D_P` (`num_diseñador`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK1_evento` (`Id_tienda`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`numero_factura`),
  ADD KEY `Fk1_factura` (`forma_pago`),
  ADD KEY `FK2_factura` (`Doc_identidad`);

--
-- Indices de la tabla `hijo`
--
ALTER TABLE `hijo`
  ADD PRIMARY KEY (`ID_hijo`),
  ADD KEY `FK1_hijo` (`DocIdentidad`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Fk1_horario` (`codigo_pais`);

--
-- Indices de la tabla `instrumento_pago`
--
ALTER TABLE `instrumento_pago`
  ADD PRIMARY KEY (`Id_MetodoPago`),
  ADD KEY `FK1_Pago` (`Doc_identidad`);

--
-- Indices de la tabla `lugar_geo`
--
ALTER TABLE `lugar_geo`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK1_lugar_geo` (`codigop`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `Fk1_Menu` (`Id_tienda`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`Idoferta`),
  ADD KEY `FK1_oferta` (`Id_tiend_Oferta`);

--
-- Indices de la tabla `oferta_categoria`
--
ALTER TABLE `oferta_categoria`
  ADD PRIMARY KEY (`Fecha_inicio`),
  ADD KEY `Fk1_Cat` (`id_cat`),
  ADD KEY `Fk2_Oferta` (`Id_oferta`);

--
-- Indices de la tabla `p1_p2`
--
ALTER TABLE `p1_p2`
  ADD KEY `Fk1_P1_P2` (`id_producto`),
  ADD KEY `Fk2_P1_P2` (`id_producto1`);

--
-- Indices de la tabla `pago_anual`
--
ALTER TABLE `pago_anual`
  ADD PRIMARY KEY (`Año`),
  ADD KEY `Fk1_pago_anual` (`numero_afiliado`);

--
-- Indices de la tabla `platillo`
--
ALTER TABLE `platillo`
  ADD PRIMARY KEY (`numero_plato`),
  ADD KEY `FK1_platillo` (`id_menu`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `Fk1_producto` (`Id_categoriaP`);

--
-- Indices de la tabla `p_c`
--
ALTER TABLE `p_c`
  ADD KEY `Fk1_producto_categoria` (`id_producto`),
  ADD KEY `Fk2_producto_categoria` (`id_categoria`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `Fk1_Telefono` (`id_tienda`),
  ADD KEY `Fk2_Telefono` (`DocIdentidad`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_tienda`),
  ADD KEY `FK1_tienda` (`codigo_lugar_geo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `c1_c2`
--
ALTER TABLE `c1_c2`
  ADD CONSTRAINT `Fk1_C1_C2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`Id_categoria`),
  ADD CONSTRAINT `Fk2_C1_C2` FOREIGN KEY (`id_categoria1`) REFERENCES `categoria` (`Id_categoria`);

--
-- Filtros para la tabla `caja`
--
ALTER TABLE `caja`
  ADD CONSTRAINT `Fk1_Caja` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda` (`id_tienda`);

--
-- Filtros para la tabla `catalogo_producto`
--
ALTER TABLE `catalogo_producto`
  ADD CONSTRAINT `Fk1_Catalogo_Producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `Fk2_Catalogo_Producto` FOREIGN KEY (`Codigo_Pais`) REFERENCES `lugar_geo` (`codigo`);

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `Fk_categoria` FOREIGN KEY (`Id_categoria_Padre`) REFERENCES `categoria` (`Id_categoria`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `FK1_cliente` FOREIGN KEY (`Numero_afiliacion`) REFERENCES `afiliacion` (`Numero_afiliado`);

--
-- Filtros para la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD CONSTRAINT `FK2_detalle_factura` FOREIGN KEY (`fecha_añadido`) REFERENCES `catalogo_producto` (`Fecha_añadido`),
  ADD CONSTRAINT `Fk1_detalle_factura` FOREIGN KEY (`numero_factura`) REFERENCES `factura` (`numero_factura`);

--
-- Filtros para la tabla `d_p`
--
ALTER TABLE `d_p`
  ADD CONSTRAINT `Fk1_D_P` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `Fk2_D_P` FOREIGN KEY (`num_diseñador`) REFERENCES `diseñadores` (`numero_diseñador`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `FK1_evento` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda` (`id_tienda`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `FK2_factura` FOREIGN KEY (`Doc_identidad`) REFERENCES `cliente` (`DocIdentidad`),
  ADD CONSTRAINT `Fk1_factura` FOREIGN KEY (`forma_pago`) REFERENCES `instrumento_pago` (`Id_MetodoPago`);

--
-- Filtros para la tabla `hijo`
--
ALTER TABLE `hijo`
  ADD CONSTRAINT `FK1_hijo` FOREIGN KEY (`DocIdentidad`) REFERENCES `cliente` (`DocIdentidad`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `Fk1_horario` FOREIGN KEY (`codigo_pais`) REFERENCES `lugar_geo` (`codigo`);

--
-- Filtros para la tabla `instrumento_pago`
--
ALTER TABLE `instrumento_pago`
  ADD CONSTRAINT `FK1_Pago` FOREIGN KEY (`Doc_identidad`) REFERENCES `cliente` (`DocIdentidad`);

--
-- Filtros para la tabla `lugar_geo`
--
ALTER TABLE `lugar_geo`
  ADD CONSTRAINT `FK1_lugar_geo` FOREIGN KEY (`codigop`) REFERENCES `lugar_geo` (`codigo`);

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `Fk1_Menu` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda` (`id_tienda`);

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `FK1_oferta` FOREIGN KEY (`Id_tiend_Oferta`) REFERENCES `tienda` (`id_tienda`);

--
-- Filtros para la tabla `oferta_categoria`
--
ALTER TABLE `oferta_categoria`
  ADD CONSTRAINT `Fk1_Cat` FOREIGN KEY (`id_cat`) REFERENCES `categoria` (`Id_categoria`),
  ADD CONSTRAINT `Fk2_Oferta` FOREIGN KEY (`Id_oferta`) REFERENCES `oferta` (`Idoferta`);

--
-- Filtros para la tabla `p1_p2`
--
ALTER TABLE `p1_p2`
  ADD CONSTRAINT `Fk1_P1_P2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `Fk2_P1_P2` FOREIGN KEY (`id_producto1`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `pago_anual`
--
ALTER TABLE `pago_anual`
  ADD CONSTRAINT `Fk1_pago_anual` FOREIGN KEY (`numero_afiliado`) REFERENCES `afiliacion` (`Numero_afiliado`);

--
-- Filtros para la tabla `platillo`
--
ALTER TABLE `platillo`
  ADD CONSTRAINT `FK1_platillo` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `Fk1_producto` FOREIGN KEY (`Id_categoriaP`) REFERENCES `categoria` (`Id_categoria`);

--
-- Filtros para la tabla `p_c`
--
ALTER TABLE `p_c`
  ADD CONSTRAINT `Fk1_producto_categoria` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `Fk2_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`Id_categoria`);

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `Fk1_Telefono` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id_tienda`),
  ADD CONSTRAINT `Fk2_Telefono` FOREIGN KEY (`DocIdentidad`) REFERENCES `cliente` (`DocIdentidad`);

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `FK1_tienda` FOREIGN KEY (`codigo_lugar_geo`) REFERENCES `lugar_geo` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
