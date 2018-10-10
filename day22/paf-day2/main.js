const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const dbconfig = require('./dbconfig');
const funcs = require('./funcs');
const querystr = require('./query');
const rs = require('./route')

const pool = mysql.createPool(dbconfig);
const app = express();

/// mkQuery() in funcs.js

///SQL

/// route funcs

app.post('/team', bodyParser.urlencoded({extended: true}),
    (req, resp) => {
        const team = funcs.parseTeam(req.body);
        console.log(team)
        rs.createTeam([ team.teamName ])
            .then(() => rs.getTeamInfo([ team.teamName ]))
            .then(result => {
                    //return Promise.resolve(result[0].team_id);
                    return (result[0].team_id);
                }
            )
            .then(teamId => {
                console.log('team id = ', teamId);
                const p = [];
                p.push(Promise.resolve(teamId));
                for (let m of team.members)
                    p.push(rs.createMemeber([m.email, m.nickname, teamId]))
                return (Promise.all(p));
            })
            .then(result => {
                console.log('Promise.all => ', result)
                resp.status(201).json({ teamId: result[0]})
            })
            .catch(err => resp.status(400).json({ error: err }))
            //.then(() => resp.status(201).json({ message: `Create ${team.teamName}`}))
            //.catch(err => resp.status(400).json({ error: err }))
        /*
        pool.getConnection((err, conn) => {
            if (err) 
                return resp.status(400).json({ error: err })
            conn.query(TEAM, [ team.teamName ], 
                (err) => {
                    conn.release();
                    if (err)
                        return resp.status(400).json({ error: err })
                    resp.status(201).json({})
                }
            )
        })
        */
    }
)

//% = like
app.get('/team/:name', (req, resp) => {
    rs.getTeamInfo([ `%${req.params.name}%` ])
        .then(result => {
            if (result.length)
                return resp.status(200).json(result)
            resp.status(404).json({message: 'Not found'});
        })
        .catch(err => resp.status(400).json({ error: err }))
})

///

app.use(express.static(path.join(__dirname,'public')));

pool.getConnection((err,conn)=>{
    if(err){
       return  process.exit(-1);
    }
    conn.release();
    const PORT = 3000;
    app.listen(PORT,()=>{
        console.log("application start at port", PORT)
    })
})