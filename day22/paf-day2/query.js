const SQL_INSERT_TEAM = 'insert into teams(team_name) values (?)'
const SQL_SELECT_TEAM = 'select * from teams where team_name like ?';
const SQL_INSERT_MEMBER = 'insert into members(email, nickname, team_id) values (?, ?, ?)';
module.exports = {
    SQL_INSERT_TEAM,SQL_SELECT_TEAM,SQL_INSERT_MEMBER

};