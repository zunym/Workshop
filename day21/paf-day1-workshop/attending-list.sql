create database rsvp;

use rsvp;

create table birthday (
    email varchar(64) not null,
    given_name varchar(16) not null,
    phone varchar(20),
    attending enum('yes', 'no') not null,
    remarks text,
    
    primary key(email)
);