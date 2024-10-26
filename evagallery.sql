-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3426
-- Generation Time: Jun 28, 2024 at 05:08 PM
-- Server version: 10.5.25-MariaDB-deb11
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `llstdcom_ivancak`
--

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL,
  `born` date NOT NULL,
  `bio` text NOT NULL,
  `country-label` mediumint(11) UNSIGNED NOT NULL,
  `artist_category-label` mediumint(11) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL,
  `user-label` mediumint(11) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` VALUES(1, '42e27c58-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'martin-benka', 'Martin Benka', '1888-09-21', '<p>Zakladateľ moderného slovenského prejavu v maľbe a v kresbe. Venoval sa gobelínovej tvorbe, scénickému výtvarníctvu, hudbe a husliarstvu. </p>', 155, 1, 1, 0);
INSERT INTO `artist` VALUES(3, '42e27dcc-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'peter-koloman', 'Peter Koloman', '1975-05-04', '<p>Peter Koloman sa narodil v Bratislave, kde od malička prejavoval záujem o umenie a fotografiu. Jeho prvý fotoaparát dostal od svojho otca, ktorý ho inšpiroval k objavovaniu krásy okolo seba. Počas štúdií na Vysokej škole výtvarných umení sa zameriaval na portrétnu fotografiu a dokumentárne snímanie.</p>', 155, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `artist_category`
--

CREATE TABLE `artist_category` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artist_category`
--

INSERT INTO `artist_category` VALUES(1, '42e6f9b4-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'painter', 'Painter');
INSERT INTO `artist_category` VALUES(2, '42e6fb0e-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'photographer', 'Photographer');

-- --------------------------------------------------------

--
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `artist-label` mediumint(11) UNSIGNED NOT NULL,
  `image` char(250) NOT NULL,
  `year` tinytext NOT NULL,
  `artwork_genre-label` mediumint(11) UNSIGNED NOT NULL,
  `artwork_worktype-label` mediumint(11) UNSIGNED NOT NULL,
  `category` enum('easel painting') NOT NULL,
  `artwork_material-label` mediumint(11) UNSIGNED NOT NULL,
  `artwork_technique-label` mediumint(11) UNSIGNED NOT NULL,
  `measurements` tinytext NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` VALUES(1, '42eb3720-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Liptovské Hole', 'Liptovské Hole', '<p>Liptovské Hole je jedno z typických diel Martina Benku, ktoré zachytáva idylický obraz slovenského vidieka. Dielo zobrazuje skupinu roľníkov pracujúcich na poli počas žatvy. Benka svojím jedinečným štýlom zvýrazňuje dynamiku pohybu a harmóniu medzi človekom a prírodou. V popredí vidíme postavy roľníkov v tradičných krojoch, ktoré sú pre Benku charakteristické. Na pozadí sa rozprestierajú zelené kopce a modrá obloha, čo pridáva obrazu pocit pokoja a rovnováhy. Toto dielo nielen oslavuje pracovný život slovenského ľudu, ale aj krásu a jedinečnosť slovenskej krajiny.</p>', 1, 'artworks/01.jpg', '1925', 1, 1, 'easel painting', 1, 1, '68 x 43 cm', 1, 0, 1);
INSERT INTO `artwork` VALUES(2, '42eb38af-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-27 11:40:45', 0, 'Za dedinou', 'Za dedinou', '', 3, 'artworks/02.jpg', '1920', 1, 1, 'easel painting', 1, 1, '62,5 x 44,5 cm', 1, 0, 1);
INSERT INTO `artwork` VALUES(3, '42eb39a0-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Sklabina Valley', 'Sklabina Valley', '', 1, 'artworks/03.jpg', '1935', 1, 1, 'easel painting', 1, 1, '132 x 100 cm', 1, 1, 1);
INSERT INTO `artwork` VALUES(11, '42eb3a7c-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Z Liptova', 'Z Liptova', '', 1, 'artworks/04.jpg', '1937', 1, 1, 'easel painting', 1, 1, '100 x 132 cm', 1, 1, 1);
INSERT INTO `artwork` VALUES(12, '42eb3b56-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Drevári', 'Drevári', '', 1, 'artworks/05.jpg', '1933', 1, 1, 'easel painting', 1, 1, '67 x 46 cm', 1, 0, 1);
INSERT INTO `artwork` VALUES(13, '42eb3c33-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Štúdia – Revúca', 'Štúdia – Revúca', '', 1, 'artworks/06.jpg', '1933', 1, 1, 'easel painting', 1, 1, '32.5 x 44 cm', 0, 0, 1);
INSERT INTO `artwork` VALUES(14, '42eb3d0a-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'WOMEN FARMERS II', 'WOMEN FARMERS II', '', 1, 'artworks/07.jpg', '1948', 1, 1, 'easel painting', 1, 1, '30 x 40 cm', 0, 0, 1);
INSERT INTO `artwork` VALUES(15, '42eb3de4-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Outside the village', 'Outside the village', '', 1, 'artworks/08.jpg', '1932', 1, 1, 'easel painting', 1, 1, '62,5 x 44 cm', 1, 0, 1);
INSERT INTO `artwork` VALUES(16, '42eb3ebe-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'Barn', 'Barn', '', 1, 'artworks/09.jpg', '1929', 1, 1, 'easel painting', 1, 1, '38 x 30 cm', 0, 0, 1);
INSERT INTO `artwork` VALUES(17, '42eb3fa6-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'MOŘE U CAPRI', 'MOŘE U CAPRI', '', 1, 'artworks/10.jpg', '1927', 1, 1, 'easel painting', 1, 1, '52 x 35x5 cm', 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `artwork_genre`
--

CREATE TABLE `artwork_genre` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artwork_genre`
--

INSERT INTO `artwork_genre` VALUES(1, '42f3c8cf-2a66-11', 1, '2024-06-26 16:13:36', 0, 'landscape', 'Landscape');
INSERT INTO `artwork_genre` VALUES(2, '42f3ca34-2a66-11', 1, '2024-06-26 16:13:36', 0, 'portrait', 'Portrait');
INSERT INTO `artwork_genre` VALUES(3, '42f3caef-2a66-11', 1, '2024-06-26 16:13:36', 0, 'akt', 'Akt');

-- --------------------------------------------------------

--
-- Table structure for table `artwork_material`
--

CREATE TABLE `artwork_material` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artwork_material`
--

INSERT INTO `artwork_material` VALUES(1, '42f81913-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'canvas', 'Canvas');
INSERT INTO `artwork_material` VALUES(2, '42f81abe-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'paper', 'Paper');

-- --------------------------------------------------------

--
-- Table structure for table `artwork_technique`
--

CREATE TABLE `artwork_technique` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artwork_technique`
--

INSERT INTO `artwork_technique` VALUES(1, '42fcbf4a-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'acrylic', 'Acrylic');

-- --------------------------------------------------------

--
-- Table structure for table `artwork_worktype`
--

CREATE TABLE `artwork_worktype` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `artwork_worktype`
--

INSERT INTO `artwork_worktype` VALUES(1, '4301d8ee-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'oil painting', 'Oil painting');
INSERT INTO `artwork_worktype` VALUES(2, '4301da64-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'drawing', 'Drawing');
INSERT INTO `artwork_worktype` VALUES(3, '4301db25-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'photography', 'Photography');
INSERT INTO `artwork_worktype` VALUES(4, '4301dbcf-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'graphics', 'Graphics');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='project';

--
-- Dumping data for table `country`
--

INSERT INTO `country` VALUES(1, '37029e09-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'afghanistan', 'Afghanistan', 'AF');
INSERT INTO `country` VALUES(2, '3702a059-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'albania', 'Albania', 'AL');
INSERT INTO `country` VALUES(3, '3702a176-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'algeria', 'Algeria', 'DZ');
INSERT INTO `country` VALUES(4, '3702a234-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'andorra', 'Andorra', 'AD');
INSERT INTO `country` VALUES(5, '3702a2ea-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'angola', 'Angola', 'AO');
INSERT INTO `country` VALUES(6, '3702a39a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'antigua-and-barbuda', 'Antigua and Barbuda', 'AG');
INSERT INTO `country` VALUES(7, '3702a44c-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'argentina', 'Argentina', 'AR');
INSERT INTO `country` VALUES(8, '3702a4fc-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'armenia', 'Armenia', 'AM');
INSERT INTO `country` VALUES(9, '3702a609-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'australia', 'Australia', 'AU');
INSERT INTO `country` VALUES(10, '3702a6be-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'austria', 'Austria', 'AT');
INSERT INTO `country` VALUES(11, '3702a76e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'azerbaijan', 'Azerbaijan', 'AZ');
INSERT INTO `country` VALUES(12, '3702a81b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bahamas', 'Bahamas', 'BS');
INSERT INTO `country` VALUES(13, '3702a8cb-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bahrain', 'Bahrain', 'BH');
INSERT INTO `country` VALUES(14, '3702a979-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bangladesh', 'Bangladesh', 'BD');
INSERT INTO `country` VALUES(15, '3702aa26-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'barbados', 'Barbados', 'BB');
INSERT INTO `country` VALUES(16, '3702aad6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'belarus', 'Belarus', 'BY');
INSERT INTO `country` VALUES(17, '3702ab83-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'belgium', 'Belgium', 'BE');
INSERT INTO `country` VALUES(18, '3702ac30-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'belize', 'Belize', 'BZ');
INSERT INTO `country` VALUES(19, '3702ace0-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'benin', 'Benin', 'BJ');
INSERT INTO `country` VALUES(20, '3702ade7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bhutan', 'Bhutan', 'BT');
INSERT INTO `country` VALUES(21, '3702aed2-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bolivia', 'Bolivia', 'BO');
INSERT INTO `country` VALUES(22, '3702af87-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bosnia-and-herzegovina', 'Bosnia and Herzegovina', 'BA');
INSERT INTO `country` VALUES(23, '3702b037-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'botswana', 'Botswana', 'BW');
INSERT INTO `country` VALUES(24, '3702b0e4-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'brazil', 'Brazil', 'BR');
INSERT INTO `country` VALUES(25, '3702b194-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'brunei', 'Brunei Darussalam', 'BN');
INSERT INTO `country` VALUES(26, '3702b242-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'bulgaria', 'Bulgaria', 'BG');
INSERT INTO `country` VALUES(27, '3702b2f2-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'burkina-faso', 'Burkina Faso', 'BF');
INSERT INTO `country` VALUES(28, '3702b3f3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'burundi', 'Burundi', 'BI');
INSERT INTO `country` VALUES(29, '3702b4eb-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'cabo-verde', 'Cabo Verde', 'CV');
INSERT INTO `country` VALUES(30, '3702b59e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'cambodia', 'Cambodia', 'KH');
INSERT INTO `country` VALUES(31, '3702b64b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'cameroon', 'Cameroon', 'CM');
INSERT INTO `country` VALUES(32, '3702b6f6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'canada', 'Canada', 'CA');
INSERT INTO `country` VALUES(33, '3702b7a3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'central-african-republic', 'Central African Republic', 'CF');
INSERT INTO `country` VALUES(34, '3702b850-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'chad', 'Chad', 'TD');
INSERT INTO `country` VALUES(35, '3702b8fa-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'chile', 'Chile', 'CL');
INSERT INTO `country` VALUES(36, '3702b9a5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'china', 'China', 'CN');
INSERT INTO `country` VALUES(37, '3702ba52-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'colombia', 'Colombia', 'CO');
INSERT INTO `country` VALUES(38, '3702bafc-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'comoros', 'Comoros', 'KM');
INSERT INTO `country` VALUES(39, '3702bbaa-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'congo', 'Congo', 'CG');
INSERT INTO `country` VALUES(40, '3702bc54-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'costa-rica', 'Costa Rica', 'CR');
INSERT INTO `country` VALUES(41, '3702bcfe-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'croatia', 'Croatia', 'HR');
INSERT INTO `country` VALUES(42, '3702bdac-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'cuba', 'Cuba', 'CU');
INSERT INTO `country` VALUES(43, '3702be59-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'cyprus', 'Cyprus', 'CY');
INSERT INTO `country` VALUES(44, '3702bf06-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'czech-republic', 'Czech Republic', 'CZ');
INSERT INTO `country` VALUES(45, '3702bfb1-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'denmark', 'Denmark', 'DK');
INSERT INTO `country` VALUES(46, '3702c05e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'djibouti', 'Djibouti', 'DJ');
INSERT INTO `country` VALUES(47, '3702c108-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'dominica', 'Dominica', 'DM');
INSERT INTO `country` VALUES(48, '3702c1b3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'dominican-republic', 'Dominican Republic', 'DO');
INSERT INTO `country` VALUES(49, '3702c260-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'ecuador', 'Ecuador', 'EC');
INSERT INTO `country` VALUES(50, '3702c30a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'egypt', 'Egypt', 'EG');
INSERT INTO `country` VALUES(51, '3702c3b7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'el-salvador', 'El Salvador', 'SV');
INSERT INTO `country` VALUES(52, '3702c462-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'equatorial-guinea', 'Equatorial Guinea', 'GQ');
INSERT INTO `country` VALUES(53, '3702c50f-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'eritrea', 'Eritrea', 'ER');
INSERT INTO `country` VALUES(54, '3702c5ee-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'estonia', 'Estonia', 'EE');
INSERT INTO `country` VALUES(55, '3702c6a1-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'eswatini', 'Eswatini', 'SZ');
INSERT INTO `country` VALUES(56, '3702c74e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'ethiopia', 'Ethiopia', 'ET');
INSERT INTO `country` VALUES(57, '3702c7f9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'fiji', 'Fiji', 'FJ');
INSERT INTO `country` VALUES(58, '3702c8a3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'finland', 'Finland', 'FI');
INSERT INTO `country` VALUES(59, '3702c94e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'france', 'France', 'FR');
INSERT INTO `country` VALUES(60, '3702c9f8-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'gabon', 'Gabon', 'GA');
INSERT INTO `country` VALUES(61, '3702caa5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'gambia', 'Gambia', 'GM');
INSERT INTO `country` VALUES(62, '3702cb50-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'georgia', 'Georgia', 'GE');
INSERT INTO `country` VALUES(63, '3702cbfa-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'germany', 'Germany', 'DE');
INSERT INTO `country` VALUES(64, '3702cca5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'ghana', 'Ghana', 'GH');
INSERT INTO `country` VALUES(65, '3702cd52-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'greece', 'Greece', 'GR');
INSERT INTO `country` VALUES(66, '3702cdfc-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'grenada', 'Grenada', 'GD');
INSERT INTO `country` VALUES(67, '3702cea7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'guatemala', 'Guatemala', 'GT');
INSERT INTO `country` VALUES(68, '3702cf54-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'guinea', 'Guinea', 'GN');
INSERT INTO `country` VALUES(69, '3702cffe-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'guinea-bissau', 'Guinea-Bissau', 'GW');
INSERT INTO `country` VALUES(70, '3702d0d3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'guyana', 'Guyana', 'GY');
INSERT INTO `country` VALUES(71, '3702d180-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'haiti', 'Haiti', 'HT');
INSERT INTO `country` VALUES(72, '3702d22a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'honduras', 'Honduras', 'HN');
INSERT INTO `country` VALUES(73, '3702d2f9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'hungary', 'Hungary', 'HU');
INSERT INTO `country` VALUES(74, '3702d3ae-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'iceland', 'Iceland', 'IS');
INSERT INTO `country` VALUES(75, '3702d459-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'india', 'India', 'IN');
INSERT INTO `country` VALUES(76, '3702d506-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'indonesia', 'Indonesia', 'ID');
INSERT INTO `country` VALUES(77, '3702d5b1-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'iran', 'Iran', 'IR');
INSERT INTO `country` VALUES(78, '3702d65b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'iraq', 'Iraq', 'IQ');
INSERT INTO `country` VALUES(79, '3702d708-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'ireland', 'Ireland', 'IE');
INSERT INTO `country` VALUES(80, '3702d7b3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'israel', 'Israel', 'IL');
INSERT INTO `country` VALUES(81, '3702d860-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'italy', 'Italy', 'IT');
INSERT INTO `country` VALUES(82, '3702d90a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'jamaica', 'Jamaica', 'JM');
INSERT INTO `country` VALUES(83, '3702d9b5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'japan', 'Japan', 'JP');
INSERT INTO `country` VALUES(84, '3702da5f-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'jordan', 'Jordan', 'JO');
INSERT INTO `country` VALUES(85, '3702db0c-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'kazakhstan', 'Kazakhstan', 'KZ');
INSERT INTO `country` VALUES(86, '3702dbb7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'kenya', 'Kenya', 'KE');
INSERT INTO `country` VALUES(87, '3702dc61-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'kiribati', 'Kiribati', 'KI');
INSERT INTO `country` VALUES(88, '3702dd0e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'korea-north', 'Korea (North)', 'KP');
INSERT INTO `country` VALUES(89, '3702ddb9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'korea-south', 'Korea (South)', 'KR');
INSERT INTO `country` VALUES(90, '3702de63-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'kuwait', 'Kuwait', 'KW');
INSERT INTO `country` VALUES(91, '3702df10-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'kyrgyzstan', 'Kyrgyzstan', 'KG');
INSERT INTO `country` VALUES(92, '3702dfbb-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'laos', 'Laos', 'LA');
INSERT INTO `country` VALUES(93, '3702e1a6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'latvia', 'Latvia', 'LV');
INSERT INTO `country` VALUES(94, '3702e26d-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'lebanon', 'Lebanon', 'LB');
INSERT INTO `country` VALUES(95, '3702e31a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'lesotho', 'Lesotho', 'LS');
INSERT INTO `country` VALUES(96, '3702e3ca-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'liberia', 'Liberia', 'LR');
INSERT INTO `country` VALUES(97, '3702e474-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'libya', 'Libya', 'LY');
INSERT INTO `country` VALUES(98, '3702e522-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'liechtenstein', 'Liechtenstein', 'LI');
INSERT INTO `country` VALUES(99, '3702e5cf-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'lithuania', 'Lithuania', 'LT');
INSERT INTO `country` VALUES(100, '3702e679-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'luxembourg', 'Luxembourg', 'LU');
INSERT INTO `country` VALUES(101, '3702e726-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'madagascar', 'Madagascar', 'MG');
INSERT INTO `country` VALUES(102, '3702e7d4-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'malawi', 'Malawi', 'MW');
INSERT INTO `country` VALUES(103, '3702e881-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'malaysia', 'Malaysia', 'MY');
INSERT INTO `country` VALUES(104, '3702e92e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'maldives', 'Maldives', 'MV');
INSERT INTO `country` VALUES(105, '3702e9db-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mali', 'Mali', 'ML');
INSERT INTO `country` VALUES(106, '3702ea86-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'malta', 'Malta', 'MT');
INSERT INTO `country` VALUES(107, '3702eb33-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'marshall-islands', 'Marshall Islands', 'MH');
INSERT INTO `country` VALUES(108, '3702ebe0-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mauritania', 'Mauritania', 'MR');
INSERT INTO `country` VALUES(109, '3702ec8d-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mauritius', 'Mauritius', 'MU');
INSERT INTO `country` VALUES(110, '3702ed3a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mexico', 'Mexico', 'MX');
INSERT INTO `country` VALUES(111, '3702ede5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'micronesia', 'Micronesia', 'FM');
INSERT INTO `country` VALUES(112, '3702ee92-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'moldova', 'Moldova', 'MD');
INSERT INTO `country` VALUES(113, '3702ef66-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'monaco', 'Monaco', 'MC');
INSERT INTO `country` VALUES(114, '3702f016-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mongolia', 'Mongolia', 'MN');
INSERT INTO `country` VALUES(115, '3702f0c4-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'montenegro', 'Montenegro', 'ME');
INSERT INTO `country` VALUES(116, '3702f171-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'morocco', 'Morocco', 'MA');
INSERT INTO `country` VALUES(117, '3702f21b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mozambique', 'Mozambique', 'MZ');
INSERT INTO `country` VALUES(118, '3702f2d1-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'myanmar', 'Myanmar', 'MM');
INSERT INTO `country` VALUES(119, '3702f37e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'namibia', 'Namibia', 'NA');
INSERT INTO `country` VALUES(120, '3702f42b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'nauru', 'Nauru', 'NR');
INSERT INTO `country` VALUES(121, '3702f516-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'nepal', 'Nepal', 'NP');
INSERT INTO `country` VALUES(122, '3702f5c9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'netherlands', 'Netherlands', 'NL');
INSERT INTO `country` VALUES(123, '3702f676-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'new-zealand', 'New Zealand', 'NZ');
INSERT INTO `country` VALUES(124, '3702f723-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'nicaragua', 'Nicaragua', 'NI');
INSERT INTO `country` VALUES(125, '3702f7d0-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'niger', 'Niger', 'NE');
INSERT INTO `country` VALUES(126, '3702f87d-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'nigeria', 'Nigeria', 'NG');
INSERT INTO `country` VALUES(127, '3702f92b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'north-macedonia', 'North Macedonia', 'MK');
INSERT INTO `country` VALUES(128, '3702f9d8-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'norway', 'Norway', 'NO');
INSERT INTO `country` VALUES(129, '3702fa85-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'oman', 'Oman', 'OM');
INSERT INTO `country` VALUES(130, '3702fb32-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'pakistan', 'Pakistan', 'PK');
INSERT INTO `country` VALUES(131, '3702fbe0-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'palau', 'Palau', 'PW');
INSERT INTO `country` VALUES(132, '3702fc8d-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'panama', 'Panama', 'PA');
INSERT INTO `country` VALUES(133, '3702fd3a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'papua-new-guinea', 'Papua New Guinea', 'PG');
INSERT INTO `country` VALUES(134, '3702fde7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'paraguay', 'Paraguay', 'PY');
INSERT INTO `country` VALUES(135, '3702feb3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'peru', 'Peru', 'PE');
INSERT INTO `country` VALUES(136, '3702ff69-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'philippines', 'Philippines', 'PH');
INSERT INTO `country` VALUES(137, '37030019-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'poland', 'Poland', 'PL');
INSERT INTO `country` VALUES(138, '370300c6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'portugal', 'Portugal', 'PT');
INSERT INTO `country` VALUES(139, '37030170-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'qatar', 'Qatar', 'QA');
INSERT INTO `country` VALUES(140, '3703021d-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'romania', 'Romania', 'RO');
INSERT INTO `country` VALUES(141, '370302cb-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'russia', 'Russia', 'RU');
INSERT INTO `country` VALUES(142, '37030378-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'rwanda', 'Rwanda', 'RW');
INSERT INTO `country` VALUES(143, '37030425-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'saint-kitts-and-nevis', 'Saint Kitts and Nevis', 'KN');
INSERT INTO `country` VALUES(144, '370304d2-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'saint-lucia', 'Saint Lucia', 'LC');
INSERT INTO `country` VALUES(145, '37030582-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'saint-vincent-and-the-grenadines', 'Saint Vincent and the Grenadines', 'VC');
INSERT INTO `country` VALUES(146, '37030630-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'samoa', 'Samoa', 'WS');
INSERT INTO `country` VALUES(147, '370306dd-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'san-marino', 'San Marino', 'SM');
INSERT INTO `country` VALUES(148, '3703078a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'sao-tome-and-principe', 'Sao Tome and Principe', 'ST');
INSERT INTO `country` VALUES(149, '37030837-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'saudi-arabia', 'Saudi Arabia', 'SA');
INSERT INTO `country` VALUES(150, '370308e2-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'senegal', 'Senegal', 'SN');
INSERT INTO `country` VALUES(151, '3703098f-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'serbia', 'Serbia', 'RS');
INSERT INTO `country` VALUES(152, '37030a3c-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'seychelles', 'Seychelles', 'SC');
INSERT INTO `country` VALUES(153, '37030ae6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'sierra-leone', 'Sierra Leone', 'SL');
INSERT INTO `country` VALUES(154, '37030b94-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'singapore', 'Singapore', 'SG');
INSERT INTO `country` VALUES(155, '37030c41-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'slovakia', 'Slovakia', 'SK');
INSERT INTO `country` VALUES(156, '37030cee-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'slovenia', 'Slovenia', 'SI');
INSERT INTO `country` VALUES(157, '37030d9b-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'solomon-islands', 'Solomon Islands', 'SB');
INSERT INTO `country` VALUES(158, '37030e48-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'somalia', 'Somalia', 'SO');
INSERT INTO `country` VALUES(159, '37030ef6-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'south-africa', 'South Africa', 'ZA');
INSERT INTO `country` VALUES(160, '37030fa3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'south-sudan', 'South Sudan', 'SS');
INSERT INTO `country` VALUES(161, '37031050-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'spain', 'Spain', 'ES');
INSERT INTO `country` VALUES(162, '370310fa-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'sri-lanka', 'Sri Lanka', 'LK');
INSERT INTO `country` VALUES(163, '370311a8-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'sudan', 'Sudan', 'SD');
INSERT INTO `country` VALUES(164, '37031255-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'suriname', 'Suriname', 'SR');
INSERT INTO `country` VALUES(165, '37031302-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'sweden', 'Sweden', 'SE');
INSERT INTO `country` VALUES(166, '370313af-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'switzerland', 'Switzerland', 'CH');
INSERT INTO `country` VALUES(167, '3703145c-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'syria', 'Syria', 'SY');
INSERT INTO `country` VALUES(168, '37031507-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'taiwan', 'Taiwan', 'TW');
INSERT INTO `country` VALUES(169, '370315b7-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'tajikistan', 'Tajikistan', 'TJ');
INSERT INTO `country` VALUES(170, '37031661-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'tanzania', 'Tanzania', 'TZ');
INSERT INTO `country` VALUES(171, '3703170e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'thailand', 'Thailand', 'TH');
INSERT INTO `country` VALUES(172, '370317bc-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'timor-leste', 'Timor-Leste', 'TL');
INSERT INTO `country` VALUES(173, '37031869-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'togo', 'Togo', 'TG');
INSERT INTO `country` VALUES(174, '37031916-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'tonga', 'Tonga', 'TO');
INSERT INTO `country` VALUES(175, '370319c3-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'trinidad-and-tobago', 'Trinidad and Tobago', 'TT');
INSERT INTO `country` VALUES(176, '37031a71-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'tunisia', 'Tunisia', 'TN');
INSERT INTO `country` VALUES(177, '37031b1e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'turkey', 'Turkey', 'TR');
INSERT INTO `country` VALUES(178, '37031bc8-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'turkmenistan', 'Turkmenistan', 'TM');
INSERT INTO `country` VALUES(179, '37031c75-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'tuvalu', 'Tuvalu', 'TV');
INSERT INTO `country` VALUES(180, '37031d23-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'uganda', 'Uganda', 'UG');
INSERT INTO `country` VALUES(181, '37031dd0-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'ukraine', 'Ukraine', 'UA');
INSERT INTO `country` VALUES(182, '37031e7a-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'united-arab-emirates', 'United Arab Emirates', 'AE');
INSERT INTO `country` VALUES(183, '37031f27-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'united-kingdom', 'United Kingdom', 'GB');
INSERT INTO `country` VALUES(184, '37031fd5-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'united-states', 'United States', 'US');
INSERT INTO `country` VALUES(185, '37032082-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'uruguay', 'Uruguay', 'UY');
INSERT INTO `country` VALUES(186, '3703212c-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'uzbekistan', 'Uzbekistan', 'UZ');
INSERT INTO `country` VALUES(187, '370321d9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'vanuatu', 'Vanuatu', 'VU');
INSERT INTO `country` VALUES(188, '37032289-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'vatican-city', 'Vatican City', 'VA');
INSERT INTO `country` VALUES(189, '37032334-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'venezuela', 'Venezuela', 'VE');
INSERT INTO `country` VALUES(190, '370323e1-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'vietnam', 'Vietnam', 'VN');
INSERT INTO `country` VALUES(191, '3703248e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'yemen', 'Yemen', 'YE');
INSERT INTO `country` VALUES(192, '3703253e-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'zambia', 'Zambia', 'ZM');
INSERT INTO `country` VALUES(193, '370325e9-2eef-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'zimbabwe', 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `exhibition`
--

CREATE TABLE `exhibition` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL,
  `date_since` date NOT NULL,
  `date_to` date NOT NULL,
  `curator` tinytext NOT NULL,
  `gallery-label` mediumint(11) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `exhibition`
--

INSERT INTO `exhibition` VALUES(1, '4310f3f2-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'jarna-vystava-2024', 'Jarná výstava 2024', '2024-06-14', '2024-06-29', 'Tomáš Lukačka', 1, 1);
INSERT INTO `exhibition` VALUES(2, '4310f570-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'nase-leto', 'Naše leto', '2024-06-29', '2024-07-27', 'Tomáš Lukačka', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `exhibition_artwork`
--

CREATE TABLE `exhibition_artwork` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `exhibition-label` mediumint(11) UNSIGNED NOT NULL,
  `artwork-label` mediumint(11) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `exhibition_artwork`
--

INSERT INTO `exhibition_artwork` VALUES(1, '42ef85e8-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, '', 1, 1);
INSERT INTO `exhibition_artwork` VALUES(2, '42ef8743-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, '', 1, 2);
INSERT INTO `exhibition_artwork` VALUES(3, '6d6fe186f72b3f44', 1, '2024-06-27 12:18:55', 0, '', 2, 15);
INSERT INTO `exhibition_artwork` VALUES(4, '43d879b1f0c5c4dc', 0, '2024-06-28 13:13:35', 0, '', 2, 17);
INSERT INTO `exhibition_artwork` VALUES(5, 'e9cbed2330bba9ca', 0, '2024-06-28 13:13:45', 0, '', 1, 11);
INSERT INTO `exhibition_artwork` VALUES(6, '4a86c7553891c0ea', 0, '2024-06-28 13:13:54', 0, '', 1, 16);
INSERT INTO `exhibition_artwork` VALUES(7, 'caeff0b53b757819', 0, '2024-06-28 13:13:59', 0, '', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `street` tinytext NOT NULL,
  `city` tinytext NOT NULL,
  `postcode` tinytext NOT NULL,
  `country-label` mediumint(11) UNSIGNED NOT NULL,
  `gps` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `user-label` mediumint(11) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` VALUES(1, '9a996353-2a65-11', 1, '2024-06-26 16:14:53', 0, 'slovenska-narodna-galeria', 'Slovenská národná galéria', '<p>Slovenská národná galéria je v zriaďovacej listine definovaná ako najvyššia a centrálna galerijná inštitúcia Slovenska.\r\n</p><p>Táto požiadavka sa postupne napĺňala prostredníctvom činnosti galérie. SNG možno chápať ako zbierkotvornú galerijnú inštitúciu, ktorá plní očakávania odbornej i širokej verejnosti: Jej úlohou je rozvíjať sa ako celonárodná umenovedná inštitúcia a zároveň zbierať, chrániť a interpretovať umelecké diela v domácom i v medzinárodnom priestore.</p>', 'Riečna 1', 'Bratislava', '831 01', 155, '48.1404819N, 17.1078978E', 1, 1);
INSERT INTO `gallery` VALUES(2, '9a996574-2a65-11', 1, '2024-06-26 16:15:02', 0, 'schaubmarov-mlyn', 'Schaubmarov mlyn', '', '', 'Pezinok', '', 155, '', 0, 1);
INSERT INTO `gallery` VALUES(3, '9a996632-2a65-11', 1, '2024-06-26 16:09:06', 0, 'galeria-ludovita-fullu', 'Galéria Ľudovíta Fullu', '', '', 'Ružomberok', '', 155, '', 0, 1);
INSERT INTO `gallery` VALUES(4, '9a996749-2a65-11', 1, '2024-06-26 16:09:12', 0, 'zvolensky-zamok', 'Zvolenský zámok', '', '', 'Zvolen', '', 155, '', 0, 0);
INSERT INTO `gallery` VALUES(5, '9a996882-2a65-11', 1, '2024-06-26 16:09:16', 0, 'kastiel-strazky', 'Kaštieľ Strážky', '', '', 'Spišská Belá-Strážky', '', 155, '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `unity_artwork`
--

CREATE TABLE `unity_artwork` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `artwork-label` mediumint(11) UNSIGNED NOT NULL,
  `image_full` char(250) NOT NULL,
  `image_thumb` char(250) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `scale` int(11) NOT NULL,
  `unity_wall-label` mediumint(11) UNSIGNED NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `unity_artwork`
--

INSERT INTO `unity_artwork` VALUES(1, '5dc30102-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, '', 1, 'sng/test-01-full.jpg', 'sng/test-01-thumb.jpg', 1920, 1080, 100, 1, 3600, 1600);
INSERT INTO `unity_artwork` VALUES(2, '5dc302b6-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, '', 2, 'sng/test-02-full.jpg', 'sng/test-02-thumb.jpg', 460, 460, 100, 1, 7200, 1200);
INSERT INTO `unity_artwork` VALUES(3, '5dc30379-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, '', 3, 'sng/test-03-full.jpg', 'sng/test-03-thumb.jpg', 460, 460, 100, 1, 5600, 1200);

-- --------------------------------------------------------

--
-- Table structure for table `unity_room`
--

CREATE TABLE `unity_room` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `gallery-label` mediumint(11) UNSIGNED NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `unity_room`
--

INSERT INTO `unity_room` VALUES(1, '5dc7b396-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'hlavna sien', 1, 10000, 10000);
INSERT INTO `unity_room` VALUES(2, '5dc7b4e8-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'chodba', 1, 3600, 10000);
INSERT INTO `unity_room` VALUES(3, '5dc7b5a4-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'mala sala', 1, 4600, 8600);

-- --------------------------------------------------------

--
-- Table structure for table `unity_wall`
--

CREATE TABLE `unity_wall` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) DEFAULT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `unity_room-label` mediumint(11) UNSIGNED NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `thick` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `rotation` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `unity_wall`
--

INSERT INTO `unity_wall` VALUES(1, '5dcc4103-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'stena prva', 1, 10000, 3500, 250, 0, 0, 0);
INSERT INTO `unity_wall` VALUES(2, '5dcc4252-2a66-11ef-8be3-fa163e41b977', 1, '2024-06-26 16:13:36', 0, 'stena druha', 1, 10000, 3600, 250, 10000, 0, 90);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `unique` varchar(36) NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) NOT NULL,
  `label` varchar(250) NOT NULL,
  `email` tinytext NOT NULL,
  `password` varchar(240) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `avatar` char(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='system';

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES(1, '66947adb7143b65d', 1, '2024-06-24 17:32:33', 0, 'lubo-ivancak', 'lubo@ivancak.sk', '202cb962ac59075b964b07152d234b70', 'Ľubo Ivančák', '<p>grafik, programátor, tvorca počítačových hier</p>', 'avatar-01.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artist_category`
--
ALTER TABLE `artist_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artwork_genre`
--
ALTER TABLE `artwork_genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artwork_material`
--
ALTER TABLE `artwork_material`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artwork_technique`
--
ALTER TABLE `artwork_technique`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `artwork_worktype`
--
ALTER TABLE `artwork_worktype`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exhibition`
--
ALTER TABLE `exhibition`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `exhibition_artwork`
--
ALTER TABLE `exhibition_artwork`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `unity_artwork`
--
ALTER TABLE `unity_artwork`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `unity_room`
--
ALTER TABLE `unity_room`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `unity_wall`
--
ALTER TABLE `unity_wall`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`unique`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `artist_category`
--
ALTER TABLE `artist_category`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `artwork_genre`
--
ALTER TABLE `artwork_genre`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `artwork_material`
--
ALTER TABLE `artwork_material`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `artwork_technique`
--
ALTER TABLE `artwork_technique`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `artwork_worktype`
--
ALTER TABLE `artwork_worktype`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `exhibition`
--
ALTER TABLE `exhibition`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exhibition_artwork`
--
ALTER TABLE `exhibition_artwork`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `unity_artwork`
--
ALTER TABLE `unity_artwork`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unity_room`
--
ALTER TABLE `unity_room`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unity_wall`
--
ALTER TABLE `unity_wall`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
