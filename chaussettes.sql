-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : mer. 01 fév. 2023 à 19:44
-- Version du serveur : 5.7.41
-- Version de PHP : 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chaussettes`
--

-- --------------------------------------------------------

--
-- Structure de la table `communicationConseiller`
--

CREATE TABLE `communicationConseiller` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_conseiller` int(11) NOT NULL,
  `contenu` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `communicationConseiller`
--

INSERT INTO `communicationConseiller` (`id`, `id_user`, `id_conseiller`, `contenu`) VALUES
(70, 1, 3, 'htht');

-- --------------------------------------------------------

--
-- Structure de la table `communicationSalon`
--

CREATE TABLE `communicationSalon` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `contenu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `communicationSalon`
--

INSERT INTO `communicationSalon` (`id`, `id_user`, `id_salon`, `contenu`) VALUES
(41, 1, 1, 'jyj');

-- --------------------------------------------------------

--
-- Structure de la table `conseiller`
--

CREATE TABLE `conseiller` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `disponible` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `conseiller`
--

INSERT INTO `conseiller` (`id`, `nom`, `prenom`, `disponible`) VALUES
(1, 'Boules', 'Patrick', 1),
(2, 'Damien', 'Damien', 1),
(3, 'Francois', 'Francois', 0),
(4, 'Admin', 'Admin', 1),
(5, 'test', 'test', 1);

-- --------------------------------------------------------

--
-- Structure de la table `demandeCommunication`
--

CREATE TABLE `demandeCommunication` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_conseiller` int(11) NOT NULL,
  `isAccepted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `demandeCommunication`
--

INSERT INTO `demandeCommunication` (`id`, `id_user`, `id_conseiller`, `isAccepted`) VALUES
(8, 1, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `message`, `date_created`) VALUES
(1, 'Votre message de notification', '2022-11-23 19:11:42'),
(3, 'test notif', '2022-12-14 20:59:04'),
(4, 'test notif', '2022-12-12 20:59:07'),
(5, '', '2022-12-12 20:59:31'),
(6, 'test 59 ', '2023-01-02 12:35:24'),
(7, '50% sur la ventes des jantes kawaï', '2023-01-31 21:00:25'),
(8, '50% sur la ventes des jantes kawaï', '2023-01-31 21:00:27');

-- --------------------------------------------------------

--
-- Structure de la table `salon`
--

CREATE TABLE `salon` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nb_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `salon`
--

INSERT INTO `salon` (`id`, `nom`, `nb_max`) VALUES
(1, 'salon moto 1', 15),
(9, 'SAloone', 2),
(10, 'salon grosse moto', 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
(1, 'pierre@pierre.com', 'pierre'),
(2, 'valee@valee.com', 'valee'),
(3, 'ulysse@ulysse.com', 'ulysse');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `communicationConseiller`
--
ALTER TABLE `communicationConseiller`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `communicationSalon`
--
ALTER TABLE `communicationSalon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `conseiller`
--
ALTER TABLE `conseiller`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `demandeCommunication`
--
ALTER TABLE `demandeCommunication`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `salon`
--
ALTER TABLE `salon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `communicationConseiller`
--
ALTER TABLE `communicationConseiller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `communicationSalon`
--
ALTER TABLE `communicationSalon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `conseiller`
--
ALTER TABLE `conseiller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `demandeCommunication`
--
ALTER TABLE `demandeCommunication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `salon`
--
ALTER TABLE `salon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
