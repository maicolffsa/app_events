-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 31-01-2025 a las 18:10:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eme`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(38,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `imagen_url`) VALUES
(1, 'Evento 1', 'esta es una descripción del evento 1', 5.00, 41, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3u4Qufw1wW5nOU1HsMmy5w3mwr-YJp9hCyLxPWbYjvRou0qnaMd06ibCpLQV7WzGtaDI&usqp=CAU'),
(2, 'evento 2', 'esta es una descripción del evento 2', 12.00, 35, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHpGLBPplC3i_zEuFXQGcJho4sAbFWEmzbOA&s'),
(3, 'evento 3', 'esta es una descripción del evento 3', 15.00, 44, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeqUqqMRNG-h_ru8iyZTi4b7WeOTXISwezA&s'),
(4, 'evento 4', 'esta es una descripción del evento 4', 50.00, 24, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5yrueK20zT9TC_AcyXomn2c1sHh-2xk2HA&usqp=CAU'),
(5, 'evento 5', 'esta es una descripción del evento 5', 25.00, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiez9Q_vrZ5DWcSxEargkXJGSYbd6ZE--fw&usqp=CAU'),
(11, 'evento 6', 'esta es una descripción del evento 6', 25.00, 46, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6G3B_wnlMp1xJh8T36G8xID3eEt7oCLnbvQ&s');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `correo_electronico`, `contrasenya`, `direccion`) VALUES
(1, 'Jose Antonio', 'Ruiz Junyent', 'peperj7@gmail.com', '$2a$10$rL4eOooCcCYt6lPlzZaCauzpeQbfEih6hyZJoPJreQ8SfOYtBXBr2', 'Calle Olivella, n??10, Bajos, Sitges'),
(2, 'David', 'Lopez', 'david@gmail.com', '$2b$10$uN2fdCSPPGdNSfkQrIkjF.kxIni781avMdOCEVWIz5MSRH6SmAedW', 'calle palacios n??10barcelona'),
(3, 'Jose', 'Ruiz', 'g@gmail.com', '$2b$10$TgknrTj.NGgb0XCBTT8JWOE7maKwlfgPmgbAP4xK/GJJ1HOGAzWNa', 'calle palacios n??10barcelona'),
(4, 'a', 'a', 'a@gmail.com', '$2b$10$1AURuSOpuKWC2FDAB4Cxq.L3llWUDnAn6xW5NF0q3y0GHrlevtHr2', 'hola 9'),
(5, 'Jose', 'Ruiz', 'aaaa@gmail.com', '$2b$10$8zRo9jO7IptANr6qpyMVi.GLU2w09s77723uw67CQ..3UQENsgym6', 'calle Mallorca n??10'),
(6, 'Pepe', 'ew', 'e@gmail.com', '$2b$10$P/zzBMT3/86lIhYh2YKsI.oujdKHRvJyTrm9Tmv6TGy5ES6v7AQ96', 'sdsdds23'),
(7, 'manuel', 'lopez', 'manuel@gmail.com', '$2b$10$uHPlBqUMBGr3lbCLQPmfYuQbkB7o07sKit2eoIJIPn1H.7a365dGK', 'Calle Olivella, n??9, Bajos, Sitges'),
(8, 'ewewwe', 'weweew', 'wewe@gmail.com', '$2b$10$wPx4Po93JoMo0VSN7dDY2uzOIx/3QXbkV5p5keKVQObQLZPhhxzCu', 'Calle Olivella, n??9, Bajos, Sitges'),
(9, 'weewew', 'weweew', 'weew@gmail.com', '$2b$10$0Ep8G/hOzp7dYge.JUORM.BpiCqO00LesbHBSJRyEADnARZj.YmMS', 'fgtfhggfh'),
(10, 'reer', 'reer', 'erer@fggffg.com', '$2b$10$ZN/FSTxiCTMzCDDkhFsd2uhhfjnNJWRHCz1lpnlktlEoxz6bIIbHG', 'Calle Olivella, n??9, Bajos, Sitges'),
(11, 'a', 'a', 'a45678@gmail.com', '$2b$10$HSrwofoJKRmt81HuIw6W4ONOtevd0cO96FClKO15b4O.G5wGfG9We', 'Calle Olivella, n??9, Bajos, Sitges'),
(12, 'wewe', 'ewweewwe', 'weweewewew@gmail.com', '$2b$10$OX/EjaH3X.1xhWwxuwx.eua3dYAOpUL6552rcIbfMx7lIShsHwnF6', 'Calle Olivella, n??9, Bajos, Sitges'),
(13, 'Pepe', 'e', 'eddeeed@gmail.com', '$2b$10$3LFT4THaUpGV3DBa0OIPhOL.1eQacnKk/H/zYaDIddkzV3cPc2Er2', 'sdsdsdsd'),
(14, 'wewewqe', 'wewqewq', 'wwqeewq@gmail.com', '$2b$10$c0gKFrwj7mQ9sBO24FFYfuW/T/Ba59QJCIPVV0gbqRM2gHwiPnqwO', 'sdsdsdds'),
(15, 'r', 'r', 'r@gmail.com', '$2a$10$EuMDgMEfc3WIEHanQDCHMeDlE492Pb0aq2rnWv8cqCHyF3pcyHGTy', 'Calle Olivella, n9, Bajos, Sitgess'),
(16, 'martin', 'lopez', 'martinlopez@gmail.com', '$2b$10$RsjHOoDcMBo2ukSsZHnReeZ5wNDTpNLVfftGS.MA3Sz4XJNExbWPC', 'Calle Olivella, n??9, Bajos, Sitges'),
(17, 'lorenzo', 'ruiz', 'lorenzo@gmail.com', '$2b$10$2MC2Md9bMSRTATdMoJbBEuc/xFSTgprZBvuKfpkF1j33jMkYoZVti', 'Calle Olivella, nº9, Bajos, Sitgesss'),
(18, 'zz@gmail.com', 'lopez', 'zz@gmail.com', '$2b$10$jk.v7vsrVwm4L/kFCGtGnu0AM6d4PrmqJ5O3X6Hx0fJX1EceUj4Yu', '11'),
(19, 'a', 'a', 'a234@gmail.com', '$2b$10$MkmC6DAhzwfF8lFzXFMBHulJ8vrOlQ//dFT4VRG7clF1NvR2MQQNW', 'aa'),
(20, 'fggf', 'gfhhgf', 'gfhhgf@fdfd.com', '$2b$10$ZwLi7E0xiuTipo4RfqvEteuIkXyW6PLp1Tj.9Lk9OuwuZg3yZE5FC', 'fgdgfgf'),
(21, 'pepe', 'Ruiz Junyent', 'peperuizjunyent@gmail.com', '$2b$10$U7JCoi3wvEdUXrSwGjYzIufPXA3892FSdMUgsbrlU6qVxka0Yw4Gm', 'Calle Olivella, nº9, Bajos, Sitges modificado'),
(22, 'david', 'Ruiz Lopez', 'david.lopez@gmail.com', '$2b$10$L5wTr8HNR7KyPske4.GIM.BS.cNWGrGNAX4vH1p/PWOTmR9sklH/u', 'Calle Olivella, nº9, Bajos, Sitges modificado'),
(23, 'dffd', 'dffd', 'rdfdf@gmail.com', '$2b$10$E5OzQ8.cTsG9k.h7ZRJQa.vQmAmwUFGnaJyr9ntFXzXNknIwmfTJa', 'fddf'),
(24, 'pepe', 'hola', 'soy@gmail.com', '$2b$10$FIORwh97lbiDJIOo1DNU9eSgcUTCXfm8MvYIwX7iMFtPIh.dyIvEe', 'dffdfd'),
(25, 'java', 'java', 'java@gmail.com', '$2a$10$j6jhcrj4Pyegii0aF2WVq.ydqMvrp7RUWmZa3KOkMWwVf24fthMve', 'dfdffdfd'),
(26, 'java1', 'java1', 'java1@gmail.com', '$2a$10$rNHdoUMUEeocdzo.7XpEnuDTENpmCOPtAoMJ7BXNkkTQ368qC68aO', 'fddffdfd1011'),
(27, 'java2', 'java2', 'java2@gmail.com', '$2a$10$vxxI7QWgBMkPNppbARBgz.4BefV0EnuCINleQN8hGSwrEgLZaitwm', 'java2.'),
(28, 'java3', 'java3', 'java3@gmail.com', '$2a$10$UfjiFjEApIbTfZFrHA03Qey6FhzV1lkYqoLgO/2xpLlNh7DHquRKS', 'java3'),
(29, 'java4', 'java4', 'java4@gmail.com', '$2a$10$dHDOSkDSNMJx13pBzYORT.JdDmFT5TtvF9/bV2xMZDK.rvN4AFmj.', 'java4'),
(30, 'java5', 'java5', 'java5@gmail.com', '$2a$10$2R7UzVuAgtoBgmOr9qfQsuFOotlgNVaVe/Xycxnsjgrp0lk.yrwmS', 'java5'),
(31, 'java6', 'java6', 'java6@gmail.com', '$2a$10$N3tFF7zQ4M2SMafIy4MXZOYEmL5Jc/Dm4KbX5ai0YykOPU51KgHta', 'java6'),
(32, 'Maicol', 'wwww', 'maicol1@gmail.com', '$2b$10$iq55OPSMZRwoC356KXmoy.rkaBzn0KCz8iOOX/dzvqhyp3ACXXjoK', 'eeee'),
(33, 'Maicol', 'wwww', 'maicol2@gmail.com', '$2b$10$V/vtUrO4Us17rA.W6V/8uOJfR6ygg.ovn.Tgld90i3p0SaMsenbt6', 'kjjjk');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
