const path = require('path');
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./dbconfig');

const pool = mysql.createPool(dbconfig);
//Cache
const cacheControl = require('express-cache-controlfreak');

const app = express();

const mkQuery = function(sql, pool) {
    return function(args) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err)
                    return reject(err);
                conn.query(sql, args || [],
                    (err, result) => {
                        conn.release();
                        if (err)
                            return reject(err);
                        resolve(result);
                    }
                )
            })
        })
    }
}

SQL_SELECT_FILM = 'select title, description, release_year, rating from sakila.film where film_id = ?';
SQL_SELECT_FILMS = 'select * from sakila.film LIMIT ? OFFSET ?';

const getFilm = mkQuery(SQL_SELECT_FILM, pool);
const getFilms = mkQuery(SQL_SELECT_FILMS, pool);

app.get('/api/v1/film/:fid',(req,res)=>{
    console.log('res.params', req.params.fid);
    const fid = parseInt(req.params.fid)
    getFilm([fid]) 
    .then(result=>{
        if(result.length)
            res.cacheControl({private: true, maxAge:30}); //30s cache
            return res.status(200).json(result[0])
        res.status(400).json({status: "Not Foound"});
    })
})

app.get('/api/v1/films',(req,res)=>{
    console.log('res.query', req.query);
    var limit = parseInt(req.query.limit) || 10;
    var offset = parseInt(req.query.offset) || 0;
    getFilms([limit, offset])
    .then(result =>{
        return(           
            result.map(v=>{
                res.cacheControl({private: true, maxAge:30}); //30s cache
                return({
                    title:v.title,
                    description: v.description,
                    url:`/api/v1/film/${v.film_id}`
                })
            })
        )
    })
    .then(result => res.status(200).json(result))
    .catch(err=>{
        console.error(error);
    })
})

//directory
app.use(express.static(path.join(__dirname,'public'), {maxAge:'30'}));

//check db connection is good then port will start
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