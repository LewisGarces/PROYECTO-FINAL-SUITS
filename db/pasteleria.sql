-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 15:32:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pasteleria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_producto`
--

CREATE TABLE `t_producto` (
  `id_producto` int(11) NOT NULL,
  `producto` varchar(255) NOT NULL,
  `disponibilidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_producto`
--

INSERT INTO `t_producto` (`id_producto`, `producto`, `disponibilidad`) VALUES
(1, 'Pastel de chocolate', 'Disponible'),
(2, 'Pastel de fresa', 'No disponible'),
(3, 'Pastel de durazno', 'Disponible'),
(4, 'Pastel de limón', 'No disponible'),
(5, 'Pastel de zanahoria', 'Disponible'),
(6, 'Pastel de tres leches', 'No disponible'),
(7, 'Pastel de queso', 'Disponible'),
(8, 'Pastel de piña', 'Disponible'),
(9, 'Pastel de café', 'No disponible'),
(10, 'Pastel de nuez', 'Disponible'),
(11, 'Pastel de manzana', 'Disponible'),
(12, 'Pastel de coco', 'No disponible'),
(13, 'Pastel de crema', 'Disponible'),
(14, 'Pastel de frutos rojos', 'No disponible'),
(15, 'Pastel de chocolate blanco', 'Disponible'),
(16, 'Pastel de caramelo', 'Disponible'),
(17, 'Pastel de uva', 'No disponible'),
(18, 'Pastel de mandarina', 'Disponible'),
(19, 'Pastel de moka y nuez', 'Disponible'),
(20, 'Pastel de chocolate con menta', 'No disponible'),
(21, 'Pastel de frutas tropicales', 'Disponible'),
(22, 'Pastel de cereza', 'No disponible'),
(23, 'Pastel de oreo', 'Disponible'),
(24, 'Pastel de crema de avellanas', 'No disponible'),
(25, 'Pastel de tiramisú', 'Disponible'),
(26, 'Pastel de frambuesa', 'No disponible'),
(27, 'Pastel de dulce de leche', 'Disponible'),
(28, 'Pastel de frutilla', 'No disponible'),
(29, 'Pastel de caramelo y nuez', 'Disponible'),
(30, 'Pastel de vainilla', 'Disponible'),
(37, 'Pastel Imposible', 'No disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_productos`
--

CREATE TABLE `t_productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `producto` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `unidades` int(11) NOT NULL,
  `fecha_entrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_productos`
--

INSERT INTO `t_productos` (`id_producto`, `nombre_cliente`, `producto`, `precio`, `unidades`, `fecha_entrega`) VALUES
(1, 'Felipe Lopez', 'Pastel de nuez', 150, 20, '2024-12-31'),
(9, 'Pedro Ulises', 'Pastel de Zarzamora', 1500, 2, '2024-12-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_usuario`
--

CREATE TABLE `t_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_usuario`
--

INSERT INTO `t_usuario` (`id_usuario`, `nombre`, `apellido`, `usuario`, `password`) VALUES
(21, 'Emanuel', 'Rojas Cruz', 'emanuelrojas@gmail.com', '$2y$10$f7BAbv4jcsXskK/VN.eo4eAiEZd2FuRMtIHgb.loJO8hy/0dn3kmC'),
(22, 'Jocelyn', 'Melo Hipolito', 'jocelynmelo@gmail.com', '$2y$10$/51xCvjY3jaeN/ta1IW35.EFxSE5XqgSTmVTEjO3aiZHeK35Y/2D.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `t_producto`
--
ALTER TABLE `t_producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `t_productos`
--
ALTER TABLE `t_productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `t_usuario`
--
ALTER TABLE `t_usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `t_producto`
--
ALTER TABLE `t_producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `t_productos`
--
ALTER TABLE `t_productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `t_usuario`
--
ALTER TABLE `t_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
