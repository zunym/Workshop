create database pafday2;
use pafday2;

create table teams (
    team_id int(8) not null auto_increment,
    team_name varchar(20),

    primary key (team_id)
);

create table members (
    email varchar(64) not null,
    nickname varchar(64),
    team_id int(8) not null,

    primary key(email),

    constraint fk_team_id
        foreign key(team_id) references team(team_id)
);