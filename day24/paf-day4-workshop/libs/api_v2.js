const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./mysql_utils');

//const SQL_SELECT_TEAM = 'select * from register where team_name like ?';

module.exports = function(pool) {

    //const getTeamInfo = utils.mkQuery(SQL_SELECT_TEAM, pool)
    //Create a router / mini express application
    const router = express.Router();

    //configure the routes
    router.get('/team/:name', 
    (req,resp)=>{
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
    
        pool.getConnection((err,conn)=>{
            if(err){
                console.log("DB Error",err);
                process.exit(-1);
            }
            conn.query(
                'select * from register limit ? offset ?',[limit,offset], //http://localhost:3000/rsvps?limit=1&offset=1
                (err,result)=>{
                    conn.release();
                    if(err){
                        console.log("Query Error",err);
                        return resp.status(400).json({error:err});
                    }
    
                    resp.status(200);
                    resp.format({
                        'application/json':()=> resp.json(result),
                        default:()=> resp.json(result)
                        
                    })
                }
            )
    
        })
    })

    return (router);
}


