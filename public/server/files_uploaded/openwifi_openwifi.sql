-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Sam 01 Avril 2017 à 17:19
-- Version du serveur :  5.5.54-0ubuntu0.14.04.1
-- Version de PHP :  5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `openwifi_openwifi`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `libelle` varchar(225) NOT NULL,
  `montant` int(11) NOT NULL,
  `periode_id` int(11) NOT NULL,
  `periode_time` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `libelle`, `montant`, `periode_id`, `periode_time`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Premium', 10, 3, 1, 0, '2017-03-15', '2017-03-15'),
(2, 'Free', 500, 1, 30, 0, '2017-03-16', '2017-03-16'),
(3, 'Gouter Voir', 100, 1, 30, 0, '2017-03-16', '2017-03-16');

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `id_logs` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `log_text` text NOT NULL,
  `log_date` varchar(100) NOT NULL,
  `user_log` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `logs`
--

INSERT INTO `logs` (`id_logs`, `type`, `log_text`, `log_date`, `user_log`) VALUES
(1, 'success', 'Paiement de pass effectuÃ© par le 59712377', '01042017155931', 0);

-- --------------------------------------------------------

--
-- Structure de la table `periodes`
--

CREATE TABLE `periodes` (
  `id` int(11) NOT NULL,
  `libelle` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `periodes`
--

INSERT INTO `periodes` (`id`, `libelle`) VALUES
(1, 'minute'),
(2, 'heure'),
(3, 'jour'),
(4, 'semaine'),
(5, 'mois');

-- --------------------------------------------------------

--
-- Structure de la table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `etat` int(11) DEFAULT '0',
  `date_utilisation` date DEFAULT NULL,
  `date_expiration` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `buyer_phone` varchar(15) DEFAULT NULL,
  `selled_id` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tickets`
--

INSERT INTO `tickets` (`id`, `code`, `categorie_id`, `client_id`, `etat`, `date_utilisation`, `date_expiration`, `created_at`, `updated_at`, `file_id`, `buyer_phone`, `selled_id`) VALUES
(106, 'h7xqn', 1, NULL, 1, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '59712377', '1a0a2d67c72ec9ffed059ec1943dc24e'),
(107, 'hdzkw', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(108, 'h564j', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(109, 'hssf6', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(110, 'hptj9', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(111, 'hqpn3', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(112, 'hme2s', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(113, 'h3du2', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(114, 'h59h8', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(115, 'h88iz', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(116, 'hff2v', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(117, 'hhsae', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(118, 'he7s3', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(119, 'hbse6', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', ''),
(120, 'hhe3k', 1, NULL, 0, NULL, NULL, '2017-03-20', '2017-03-20', NULL, '', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `username` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `remember_token` varchar(225) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'admin', 'developers@openwifi.ci', '$2y$10$9sJv56PwdsEwBPKNMuEB0.iwMONlobk44OyXymLKPrR/LyqtRCKQK', '7SH5DlPvYRVyLZPz7OTxH10s3Lgjn1Dayz9BPStj0rxFziP2TSnkwmpZQK2x', '2017-03-30', '2017-03-30');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id_logs`);

--
-- Index pour la table `periodes`
--
ALTER TABLE `periodes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `id_logs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `periodes`
--
ALTER TABLE `periodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
