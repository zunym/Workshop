const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

const apiV1 = require('./libs/api_v1');
const apiV2 = require('./libs/api_v2');

const pool = mysql.createPool(require('./dbconfig'));

const apiV1Router = apiV1(pool);
const apiV2Router = apiV2(pool);

const app = express();

app.use('/api/v1', apiV1Router);

app.use('/api/v2', apiV2Router);

//directory
app.use(express.static(path.join(__dirname,'public')));

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