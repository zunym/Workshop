CREATE DATABASE pafday2;
USE pafday2;

CREATE TABLE team (
    team_id int(8) not null auto_increment,
    team_name VARCHAR(20),

    PRIMARY KEY (team_id)
);

CREATE TABLE member (
    email VARCHAR(64) not null,
    nickname VARCHAR(64),
    team_id int(8) not null,

    PRIMARY KEY (email),
    CONSTRAINT fk_team_id
    FOREIGN KEY(team_id) REFERENCES team(team_id)
);