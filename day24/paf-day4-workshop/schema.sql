create database pafday5;
use pafday5;

CREATE TABLE replies (
    _name   CHAR(64) NOT NULL,
    _email       VARCHAR(64) NOT NULL,
    _phone       VARCHAR(20) NOT NULL,
    _attending   enum('yes','no') NOT NULL,

    PRIMARY KEY( _email )
)