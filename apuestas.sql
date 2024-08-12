-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-08-2024 a las 20:04:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apuestas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `ID` int(11) NOT NULL,
  `Juego` varchar(50) DEFAULT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `CantidadApostada` bigint(20) DEFAULT NULL,
  `Resultado` varchar(10) DEFAULT NULL,
  `GananciaPerdida` bigint(20) DEFAULT NULL,
  `Comision` decimal(10,0) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `ID_Clientes` int(11) DEFAULT NULL,
  `ID_Juego` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegoaleatorio`
--

CREATE TABLE `juegoaleatorio` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `Comision` bigint(20) DEFAULT NULL,
  `Resultado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `ID` int(11) NOT NULL,
  `Juego` varchar(50) DEFAULT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `cantidad` bigint(20) DEFAULT NULL,
  `Fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logsclientes`
--

CREATE TABLE `logsclientes` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `IP` varchar(45) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Accion` varchar(75) DEFAULT NULL,
  `ID_Cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logsempleados`
--

CREATE TABLE `logsempleados` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `IP` varchar(45) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Accion` varchar(75) DEFAULT NULL,
  `ID_Cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registroclientes`
--

CREATE TABLE `registroclientes` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `FechaNacimiento` varchar(50) DEFAULT NULL,
  `Telefono` bigint(10) NOT NULL,
  `Sexo` varchar(10) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Usuario` varchar(20) DEFAULT NULL,
  `Contrasena` varchar(100) DEFAULT NULL,
  `Moneda` varchar(30) DEFAULT NULL,
  `Saldo` bigint(8) NOT NULL,
  `Rol` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registroclientes`
--

INSERT INTO `registroclientes` (`ID`, `Nombre`, `Apellido`, `FechaNacimiento`, `Telefono`, `Sexo`, `Correo`, `Usuario`, `Contrasena`, `Moneda`, `Saldo`, `Rol`) VALUES
(1, 'Luis', 'Delgado', '1997-01-08', 4651164831, 'Masculino', 'EdgeSlayer97@gmail.com', 'Edgeslayer97', '$2b$10$QSL8CL45Bwx36l8U1CRGIuFIwciT4amc/vqumiXw1z22yKQFF5kW.', 'Peso mexicano', 2000, 'Cliente'),
(2, 'Astrid', 'Rodríguez', 'Invalid date', 4651164831, 'Femenino', 'luis_salvador97@hotmail.com', 'Edgeslayer', '$2b$10$tgzfXOIFZ58S/APRAZFOm./1Ea1QG6KylImQMHPsB8.h/QYaqLKR6', 'Peso mexicano', 2000, 'Cliente'),
(3, 'Luis Salvador', 'Delgado Romo', '1997-01-08', 4651164831, 'Masculino', 'edgeslayer2585@gmail.com', 'Edgeslayer9725', '$2b$10$7prnY1fOydCJuXendm7hlugtSzZs3xgiP/jLdi1Ah.0Db9Wha8cbi', 'Peso mexicano', 2000, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registroempleados`
--

CREATE TABLE `registroempleados` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `FechaNacimiento` varchar(50) DEFAULT NULL,
  `Sexo` varchar(10) DEFAULT NULL,
  `Telefono` smallint(6) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Usuario` varchar(8) DEFAULT NULL,
  `Contrasena` varchar(8) DEFAULT NULL,
  `Rol` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Clientes` (`ID_Clientes`),
  ADD KEY `ID_Juego` (`ID_Juego`);

--
-- Indices de la tabla `juegoaleatorio`
--
ALTER TABLE `juegoaleatorio`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `logsclientes`
--
ALTER TABLE `logsclientes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indices de la tabla `logsempleados`
--
ALTER TABLE `logsempleados`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indices de la tabla `registroclientes`
--
ALTER TABLE `registroclientes`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `registroempleados`
--
ALTER TABLE `registroempleados`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `juegoaleatorio`
--
ALTER TABLE `juegoaleatorio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logsclientes`
--
ALTER TABLE `logsclientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logsempleados`
--
ALTER TABLE `logsempleados`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registroclientes`
--
ALTER TABLE `registroclientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `registroempleados`
--
ALTER TABLE `registroempleados`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`ID_Clientes`) REFERENCES `registroclientes` (`ID`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`ID_Juego`) REFERENCES `juegos` (`ID`);

--
-- Filtros para la tabla `logsclientes`
--
ALTER TABLE `logsclientes`
  ADD CONSTRAINT `logsclientes_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `registroclientes` (`ID`);

--
-- Filtros para la tabla `logsempleados`
--
ALTER TABLE `logsempleados`
  ADD CONSTRAINT `logsempleados_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `registroclientes` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
