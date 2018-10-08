create database addressbook;

use addressbook;

create table friends (
    email varchar(256) not null,
    last_name varchar(16) not null,
    nickname varchar(16) not null,
    dob date,
    phone varchar(20),
    gender enum('m','f'),
    
    primary key(email)

);
