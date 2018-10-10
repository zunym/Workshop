const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../libs/mysql-utils');

const SQL_SELECT_TEAM = 'select * from team where team_name like ?';

module.exports = function(pool) {

    const getTeamInfo = utils.mkQuery(SQL_SELECT_TEAM, pool)
    //Create a router / mini express application
    const router = express.Router();

    //configure the routes
    router.get('/team/:name', (req, resp) => {
        getTeamInfo([ `%${req.params.name}%` ])
            .then(result => {
                if (result.length)
                    return resp.status(200).json(result)
                resp.status(404).json({message: 'Not found'});
            })
            .catch(err => resp.status(400).json({ error: err }))
    })

    return (router);
}