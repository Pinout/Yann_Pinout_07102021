const { Script } = require("vm")

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`users` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(10) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARBINARY(50) NOT NULL,
  `isAdmin` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 74
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `groupomania`.`posts` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` SMALLINT UNSIGNED NOT NULL,
  `content` TEXT NOT NULL,
  `attachement` VARCHAR(120) NULL DEFAULT NULL,
  `publication` DATETIME NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_userPost_numero` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_userPosts_numero`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 117
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;