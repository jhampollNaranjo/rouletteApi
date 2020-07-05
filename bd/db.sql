CREATE DATABASE Mydb;
USE Mydb;
CREATE TABLE User(
    idUser int PRIMARY  KEY 
);
CREATE TABLE Roulette (
    id INT  PRIMARY KEY,
    available int NOT NULL
);
CREATE TABLE bet (
    idRoulette INT NOT NUll,
    idUser INT NOT null,
    amount INT NOT NULL,
    num INT NOT NULL,
    color VARCHAR(30) NOT NULL,
    FOREIGN KEY (idRoulette) REFERENCES Roulette (id),
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);
