-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-01-2022 a las 22:52:39
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basededatos1`
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

--
-- Volcado de datos para la tabla `afiliacion`
--

INSERT INTO `afiliacion` (`Numero_afiliado`, `Descuento`, `Años_de_Afiliacion`) VALUES
(14, 40, 10),
(111, 10, 9),
(123, 10, 5),
(169, 20, 7),
(212, 50, 10),
(456, 35, 5),
(487, 60, 7),
(639, 10, 9),
(714, 30, 70),
(779, 20, 8);

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

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`DocIdentidad`, `Primer_Nombre`, `Segundo_Nombre`, `Primer_Apellido`, `Segundo_Apellido`, `Fecha_nac`, `Numero_afiliacion`) VALUES
(3531536, 'Carolina', NULL, 'Pintor', 'Pinzon', '1987-05-17', 714),
(9658741, 'Carlos', 'Didier', 'Castaño', 'Contreras', '1990-07-24', 639),
(11748962, 'Adriana', 'Marcela', 'Rey', 'Sanchez', '2000-12-29', 487),
(11874953, 'Alexander', NULL, 'Carvajal', 'Vargas', '1993-08-14', 779),
(14875934, 'Carlos', 'Emilio', 'Hernandez', 'Monterroza', '1990-03-17', 169),
(26692889, 'Alejandro', '', 'Garofalo', 'Flores', '2000-12-07', 123),
(27475935, 'Pedro', 'Eusebio', 'De Gouveia', 'Pontes', '2000-11-10', 111),
(27790953, 'Alejandro', 'Jose', 'Gamboa', 'Mendez', '2000-12-10', 212),
(28746951, 'Marco', 'Roberto', 'Perez', 'Torres', '1990-06-30', 456);

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
  `segundo_apellido` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `diseñadores`
--

INSERT INTO `diseñadores` (`numero_diseñador`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`) VALUES
(1, 'IKEA', 'of', 'Sweden', NULL),
(2, 'Johanna', NULL, 'Jelinek', NULL),
(3, 'Iina', NULL, 'Vuorivirta', NULL),
(4, 'Simon', NULL, 'edholm', NULL),
(5, 'Lisa', NULL, ' Ullenius', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar_geo`
--

CREATE TABLE `lugar_geo` (
  `codigo` smallint(2) NOT NULL,
  `nombre` varchar(18) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `codigop` smallint(2) DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `lugar_geo`
--

INSERT INTO `lugar_geo` (`codigo`, `nombre`, `tipo`, `codigop`) VALUES
(1, 'España', 'pais', NULL),
(2, 'EstadosUnidos', 'Pais', NULL),
(3, 'Mexico', 'Pais', NULL),
(10, 'Asturias', 'Estado', 1),
(11, 'Madrid', 'Estado', 1),
(12, 'Murcia', 'Estado', 1),
(13, 'Andalucia', 'Estado', 1),
(14, 'Cataluña', 'Estado', 1),
(20, 'California', 'Estado', 2),
(21, 'Florida', 'Estado', 2),
(22, 'Virginia', 'Estado', 2),
(30, 'Ciudad De México', 'Estado', 3),
(100, 'Asturias', 'Ciudad', 10),
(110, 'Goya', 'Ciudad', 11),
(130, 'Jerez', 'Ciudad', 13),
(140, 'Sabadell', 'Ciudad', 14),
(200, 'San Diego', 'Ciudad', 20),
(210, 'Miami', 'Ciudad', 21),
(220, 'Norfolk', 'Ciudad', 22);

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
  `nombre` varchar(80) NOT NULL,
  `Precio` float NOT NULL,
  `Caracteristicas` varchar(300) NOT NULL,
  `Instrucciones de uso` varchar(400) NOT NULL,
  `Materiales` varchar(150) NOT NULL,
  `Montaje` tinyint(1) NOT NULL,
  `Id_categoriaP` smallint(2) NOT NULL,
  `Cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `Precio`, `Caracteristicas`, `Instrucciones de uso`, `Materiales`, `Montaje`, `Id_categoriaP`, `Cantidad`) VALUES
(1, 'Corona, a mano natural23 cm', 9, 'usamos materiales de desecho de fábricas indias para elaborar esta corona marrón perfecta para colgarla de una puerta o una pared.', 'Limpiar con un plumero, Sólo como adorno, No ingerir.', 'Componentes de plantas secas, 100% yute', 0, 10, 10),
(2, 'Adorno, juego de 3, árbol de navidad verde', 2.5, 'Es de plástico renovable, una opción más sostenible que el plástico tradicional, que se elabora con recursos como el petróleo.', 'Limpiar con un paño seco.', 'Plástico PET, Plástico de polipropileno, Acero.', 0, 10, 10),
(3, 'Portavela, blanco 13 cm', 7, 'Puedes utilizar el portavelas con velas o como objeto decorativo independiente.\r\nUn adorno sorprendente y divertido que producirá un gran efecto en tu hogar.\r\n', 'Limpiar con un paño húmedo.', 'loza, Vidriado coloreado', 0, 11, 50),
(4, 'Farol vela gr, int / ext negro28 cm', 10, 'Adecuado para usar tanto en interiores como en exteriores.\r\nUtiliza solo 1 vela gruesa de 15 cm de alto y ∅7 cm como máximo\r\n', 'Limpiar con un paño húmedo.', 'Acero, Vidrio', 1, 11, 60),
(5, 'Guirnalda LED 40 bombillas, interior/a pilas gris plata', 10, 'Lleva luces LED, que consumen hasta un 85% menos de electricidad y duran 20 veces más que las bombillas incandescentes. Iluminación de LED integrada.', 'No mezclar pilas de tipos diferentes, ni de capacidades ni fechas de fabricación distintos.\r\nLimpiar con un paño húmedo.\r\n', 'Plástico ABS', 0, 20, 60),
(6, 'Guirnalda LED 40 bombillas, a pilas mini/pompón blanco/gris', 12, 'Difunde una bonita iluminación decorativa.\r\nDuración aproximada del LED: 25.000 horas.\r\n', 'Utiliza sólo pilas compatibles con el producto. No mezcles pilas nuevas y viejas, ni pilas de marca y tipo distinto.', 'Plástico ABS, Caucho sintético, Plástico de polietileno.', 0, 20, 48),
(7, 'Guirnalda lum LED 12, interior/a pilas gris plata', 3, 'Difunde una bonita iluminación decorativa.\nComo funciona con pilas, se puede colocar en cualquier sitio sin necesidad de enchufarse.\nLleva luces LED, que consumen hasta un 85% menos de electricidad y duran 20 veces más que las bombillas incandescentes.\n', 'Limpiar con un paño húmedo.', 'Plástico ABS, Plástico policarbonado.', 0, 20, 60),
(8, 'Guirnalda lum LED 24, exterior energía solar/balón blanco', 29, 'Difunde una bonita iluminación decorativa.\r\nFunciona con un panel solar que transforma la luz del sol en electricidad. Así ahorras energía y cuidas el medio ambiente.\r\nEs fácil de usar, ya que no se necesitan cables ni enchufes.\r\n', 'Sitúa el panel solar a plena luz del sol.\nEn un día de sol, el tiempo de recarga es de 9-12 horas; en un día nublado, 12 horas.\nLa batería se debe reemplazar únicamente por una batería recargable del mismo tipo y capacidad.\nPara un rendimiento óptimo, limpia el panel solar con regularidad para eliminar el polvo y la suciedad.\n', 'Plástico ABS, Plástico policarbonado.', 0, 21, 50),
(9, 'Guirnalda lum LED 24, exterior negro', 14, 'Difunde una bonita iluminación decorativa.\r\nLleva luces LED, que consumen hasta un 85% menos de electricidad y duran 20 veces más que las bombillas incandescentes.\r\nIluminación de LED integrada.\r\n', 'Retira el enchufe de la toma y después pasa un paño humedecido.\r\nIncluye el driver LED.\r\n', 'Plástico policarbonado', 0, 21, 50),
(10, 'Salchichas pequeñas congeladas', 4, '0.4 KG.\r\nPrecio/kg 10€\r\nEn Suecia, se sirve frita en el bufé de Navidad, pero también es muy popular durante todo el año.\r\n', 'N/A', 'N/A', 0, 30, 150),
(11, 'Albóndigas proteína vegetal, congelado500 g', 3.95, '0.5 KG\r\nLas albóndigas vegetales tienen el sabor, la textura y la jugosidad de la carne, pero están hechas de proteína de guisante, avena, patata, cebolla y manzana.\r\nComo no contiene ingredientes de origen animal, es ideal para vegetarianos y veganos.\r\n', 'En sartén: freír en poco aceite a fuego medio/bajo durante unos 10 min. Remover con regularidad.\r\nConserva el producto a -18ºC. No lo congeles de nuevo, una vez descongelado.\r\n', 'N/A', 0, 30, 100),
(12, 'Cojín para silla, rojo40/35x38x7 cm', 5, 'Gracias a la fijación con velcro, el cojín no se mueve.\r\nComo el cojín es idéntico por los dos lados, podrás darle la vuelta para que no se desgaste más por uno que por el otro.\r\nEs fácil de mantener impecable, porque se puede lavar a máquina.\r\n', 'Lavar a máquina a 40°C como máximo, tratamiento normal. No utilizar lejía. Secar en secadora a temperatura baja (60ºC como máximo).No planchar. No limpiar en seco.\r\n', 'Espuma de poliuretano, Algodón, polipropileno.', 0, 4, 60),
(13, 'Delantal 63x84 cm', 2, 'Talla única.', 'Encoge un 4% como máx.\r\nLavar a máquina a 60°C como máximo, tratamiento normal..\r\nNo utilizar lejía.\r\nSecar normal en secadora a temperatura normal (80ºC como máximo).\r\nPlanchar a 200ºC como máximo.\r\nNo limpiar en seco.\r\n', 'Algodón.', 0, 4, 100),
(14, 'Paño de cocina, rojo 45x60 cm', 0.5, 'Los colores se mantienen lavado tras lavado porque el tejido ha sido teñido en hilado.\r\nGracias a la cinta es fácil de colgar cuando no lo usas.\r\nLava este producto antes de usarlo por primera vez.\r\n', 'Encoge un 4% como máx.\r\nLavar a máquina a 60°C como máximo, tratamiento normal.\r\nNo utilizar lejía.\r\nNo secar en secadora.\r\nPlanchar a 200ºC como máximo.\r\nNo limpiar en seco.\r\n', 'Algodón.', 0, 4, 150),
(15, 'Planta artificial con LED, a pilas/árbol de navidad verde \r\n12 cm\r\n', 15, 'Difunde una bonita iluminación decorativa.\r\nComo funciona con pilas, se puede colocar en cualquier sitio sin necesidad de enchufarse.\r\nLleva luces LED, que consumen hasta un 85% menos de electricidad y duran 20 veces más que las bombillas incandescentes.\r\n', 'La lámpara tiene un temporizador integrado: se apaga automáticamente 8 horas después de haberla encendido.\r\nNo mezclar pilas de tipos diferentes, ni de capacidades ni fechas de fabricación distintos.\r\nUtiliza sólo pilas compatibles con el producto. No mezcles pilas nuevas y viejas, ni pilas de marca y tipo distinto.\r\nLimpiar con un paño seco.\r\n', 'Acero, Plástico de polipropileno, Plástico PET, Plástico de polipropileno, Hormigón armado.', 0, 50, 160),
(16, 'Planta, 3 bulbo, jacinto colores variados12 cm', 2.5, 'Las plantas de flor pueden florecer a los pocos días o meses, según hayan sido cuidadas.\r\nFlores perfumadas.\r\n', 'Aporta energía a las plantas añadiendo abono cada mes. \r\nSi la planta entra en estado de reposo, déjala hasta la próxima estación.\r\nTemperatura mínima: 0°C.\r\nColocar en un área luminosa, pero resguardado del sol.\r\nRegar con moderación.\r\n', 'Planta cultivada en maceta', 0, 50, 500),
(17, 'Macetero, vidrio/corcho', 9, 'Este macetero es ideal para orquídeas, ya que el cristal transparente permite que la luz llegue a las raíces de la planta y te ayuda a saber si necesitas regarla', 'Limpiar con un paño húmedo.', 'Vidrio, Corcho.', 0, 51, 50),
(18, 'Bote con tapa, motivo estrella rojo/blanco 13 cl', 5, 'El bote tiene un cierre hermético para que conserves perfectamente tu mermelada casera favorita.\r\nEste recipiente es hermético y apto para guardar alimentos. \r\nLa junta de caucho debe estar limpia y en buenas condiciones para funcionar correctamente.\r\n', 'Si quieres esterilizar el bote con agua hirviendo, llénalo antes con agua caliente del grifo, para evitar que el vidrio se rompa.\r\nLavar a mano.\r\nLava y seca este producto antes de usarlo por primera vez.\r\n', 'Vidrio, Laca, Caucho natural, Acero inoxidable.', 0, 6, 90),
(19, 'Bote con tapa, vidrio incoloro 0.5 l', 1.5, 'Las juntas de goma de recambio se venden aparte.\r\nEl bote tiene un cierre hermético para que conserves perfectamente tu mermelada casera favorita.\r\n', 'Si quieres esterilizar el bote con agua hirviendo, llénalo antes con agua caliente del grifo, para evitar que el vidrio se rompa.\r\nEl bote de vidrio es apto para el lavavajillas. La junta se debe lavar a mano.\r\nLava este producto antes de usarlo por primera vez.\r\n\r\n', 'Vidrio (40 % reciclado como mín.), Caucho natural, Acero inoxidable.', 0, 6, 113),
(20, 'Cortapastas j5, gris plata', 5, 'Usa la creatividad y diviértete decorando tus galletas con dulces y grasa.\r\nIncluye: 5 cortapastas redondos (3, 5, 7, 9 y 11 cm de diámetro).\r\n', 'Lava este producto antes de usarlo por primera vez.\r\nApto para lavavajillas.\r\n', 'Acero inoxidable.', 0, 6, 350);

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
  `nombre_sucursal` varchar(20) NOT NULL,
  `direccion` varchar(350) NOT NULL,
  `fecha_apertura` date NOT NULL,
  `horario` time(6) NOT NULL,
  `estilo_arquitectonico` varchar(150) NOT NULL,
  `tamaño` mediumint(5) NOT NULL,
  `numero_pasillos` smallint(2) NOT NULL,
  `capacidad_almacenmiento` int(3) NOT NULL,
  `cantidad_productos` int(3) NOT NULL,
  `area_de_niños` tinyint(1) NOT NULL,
  `codigo_lugar_geo` smallint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_tienda`, `nombre_sucursal`, `direccion`, `fecha_apertura`, `horario`, `estilo_arquitectonico`, `tamaño`, `numero_pasillos`, `capacidad_almacenmiento`, `cantidad_productos`, `area_de_niños`, `codigo_lugar_geo`) VALUES
(1, 'Ikea Asturias', 'Centro Comercial Intu Asturias, Autovía Ruta de la Plata, A-66, Km 4.5, 33429 Oviedo, Asturias, España', '2008-03-18', '10:00:00.000000', 'Arquitectura contemporánea', 24, 15, 15, 500, 1, 100);

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
