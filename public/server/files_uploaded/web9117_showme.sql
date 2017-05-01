-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Mer 22 Février 2017 à 21:50
-- Version du serveur :  5.5.52-MariaDB
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `web9117_showme`
--

-- --------------------------------------------------------

--
-- Structure de la table `sm_employes`
--

CREATE TABLE `sm_employes` (
  `ID` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenoms` varchar(50) NOT NULL,
  `post` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL,
  `photo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sm_entreprises`
--

CREATE TABLE `sm_entreprises` (
  `ID` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `adresse` text NOT NULL,
  `description` text NOT NULL,
  `domaines` varchar(100) NOT NULL,
  `pourquoi_nous` text NOT NULL,
  `annonceur` varchar(50) NOT NULL,
  `contacts` varchar(100) NOT NULL,
  `coordonnees` varchar(70) NOT NULL,
  `ouverture` varchar(30) NOT NULL,
  `services` text NOT NULL,
  `horaires` text NOT NULL,
  `partenaires` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `images` text NOT NULL,
  `site_web` varchar(100) NOT NULL,
  `reseaux_sociaux` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `sm_entreprises`
--

INSERT INTO `sm_entreprises` (`ID`, `nom`, `ville`, `adresse`, `description`, `domaines`, `pourquoi_nous`, `annonceur`, `contacts`, `coordonnees`, `ouverture`, `services`, `horaires`, `partenaires`, `email`, `photo`, `images`, `site_web`, `reseaux_sociaux`) VALUES
(1, 'Espoir Endroit', 'Abidan/Yopougon', '', '', 'Hotel', '', 'c4ca4238a0b923820dcc509a6f75849b', '', '', '', '', '', '', '', '', '', '', ''),
(2, 'AYIYIKOH BUSINESS INCUBATOR', 'Abidan/Yopougon', 'Nous somme situÃ© Ã  Yopougon quartier kowÃ«it juste Ã  cotÃ© du collÃ¨ge Saint Augustain.', 'Nous nous associons aux jeune afin de leur permettre la rÃ©alisation de leurs projets innovateurs. Notre prioritÃ© est d\'empÃªcher que les jeunes ayant des talents et des projets pour se faire valoir restent dans l\'ombre. Nous encourageons fortement l\'idÃ©e d\'entreprise.', 'Shopping', 'SimplicitÃ©, Ã©fficacitÃ©, rigueur, accueil, expÃ©rience', 'c4ca4238a0b923820dcc509a6f75849b', '48 74 60 47', '[5.3599517,-4.0082563]', '8h00', 'Fablab, incubateur, wifi zone, photocopie, impression, formation bureautique, formation en programmation informatique, conception de site web, infographie', 'Du lundi au vendredi de 8h - 18h, Samedi 9h - 16h', '', 'info@ayiyikoh.org', 'c81e728d9d4c2f636f067f89cc14862c.png', '/', 'http://www.ayiyikoh.org', ''),
(3, 'Espoir Endroit 3', 'Abidan/Yopougon', 'Abidjan, Marcory au rond point non loin de la bÃ¢che situÃ©e Ã  quelques mÃ¨tre de la mairie de la dite commune.', 'Venez dÃ©guster nos mets national et international et prenez du plaisir...', 'Restaurant', 'efficacitÃ©, sÃ©curitÃ©, paisibilitÃ©, accueil', 'c4ca4238a0b923820dcc509a6f75849b', '45 78 45 87, 20 15 78 96, 45 78 65 45', '[5.322916555870112,-4.055349826812745]', '8h00', 'wifi gratuit, parking, cafÃ©, dejeuner, souvenir, salle d\'informatique, massage, piscine', 'Lundi 7h-8h, mardi 7h-8h,mercredi 7h-10h', '', 'mail@email.com', 'eccbc87e4b5ce2fe28308fd9f2a7baf3.jpg', '/eccbc87e4b5ce2fe28308fd9f2a7baf3_7c65d594556af6784c5e2213cddf38f50.jpg/eccbc87e4b5ce2fe28308fd9f2a7baf3_7c65d594556af6784c5e2213cddf38f51.jpeg/eccbc87e4b5ce2fe28308fd9f2a7baf3_7c65d594556af6784c5e2213cddf38f52.jpg/eccbc87e4b5ce2fe28308fd9f2a7baf3_7c65d594556af6784c5e2213cddf38f53.jpg', '', ''),
(4, 'rgdf', 'srhfg', 'rdfhgcv', 'sdfgc', 'Menuiserie', '', 'c4ca4238a0b923820dcc509a6f75849b', 'ysrtdf', '[5.3599517,-4.0082563]', '', '', '', '', 'sgh@fg.g', '', '/a87ff679a2f3e71d9181a67b7542122c_f672a8dad264865da0b03744fa621dd50.jpg//a87ff679a2f3e71d9181a67b7542122c_4b9c872934b40aba01944d487e0f5e0c1.png', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `sm_pays`
--

CREATE TABLE `sm_pays` (
  `ID` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `code` int(4) NOT NULL,
  `centre` varchar(70) NOT NULL,
  `photo_desc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sm_utilisateurs`
--

CREATE TABLE `sm_utilisateurs` (
  `ID` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenoms` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `securite` varchar(200) NOT NULL,
  `date_arrivee` varchar(50) NOT NULL,
  `contacts` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `sm_utilisateurs`
--

INSERT INTO `sm_utilisateurs` (`ID`, `nom`, `prenoms`, `email`, `ville`, `description`, `securite`, `date_arrivee`, `contacts`, `photo`) VALUES
(1, 'nom', 'prenoms', 'mail@email.com', 'Abidjan/yop', 'ok je suis cool !\r\nEt tu es cool !\r\nEt la famille reste cool mec !', '781e5e245d69b566979b86e28d23f2c7', '02-12-2016', '', 'c4ca4238a0b923820dcc509a6f75849b.jpeg'),
(5, 'Client1', 'De Menez', 'client1@mail.com', 'Abidjan', 'Rien encore rien !', '6ebe76c9fb411be97b3b0d48b791a7c9', '23-12-2016 12:41', '', 'default.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `sm_villes`
--

CREATE TABLE `sm_villes` (
  `ID` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `centre` varchar(70) NOT NULL,
  `photo_desc` varchar(50) NOT NULL,
  `pays` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `sm_employes`
--
ALTER TABLE `sm_employes`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `sm_entreprises`
--
ALTER TABLE `sm_entreprises`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `sm_pays`
--
ALTER TABLE `sm_pays`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `sm_utilisateurs`
--
ALTER TABLE `sm_utilisateurs`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `sm_villes`
--
ALTER TABLE `sm_villes`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `sm_employes`
--
ALTER TABLE `sm_employes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sm_entreprises`
--
ALTER TABLE `sm_entreprises`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `sm_pays`
--
ALTER TABLE `sm_pays`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sm_utilisateurs`
--
ALTER TABLE `sm_utilisateurs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `sm_villes`
--
ALTER TABLE `sm_villes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
