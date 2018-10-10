const mysql = require('mysql');
const funcs = require('./funcs');
const querystr = require('./query');
const dbconfig = require('./dbconfig');

const pool = mysql.createPool(dbconfig);

const createTeam = funcs.mkQuery(querystr.SQL_INSERT_TEAM, pool);
const getTeamInfo = funcs.mkQuery(querystr.SQL_SELECT_TEAM, pool);
const createMemeber = funcs.mkQuery(querystr.SQL_INSERT_MEMBER, pool);

module.exports = {
    createTeam, getTeamInfo,createMemeber
};