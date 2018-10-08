CREATE TABLE `books` (
  `idbooks` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `publish_year` YEAR NOT NULL,
  `isbn` INT(13) NOT NULL,
  PRIMARY KEY (`idbooks`),
  UNIQUE INDEX `idbooks_UNIQUE` (`idbooks` ASC) );