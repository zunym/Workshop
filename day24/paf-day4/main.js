const path = require('path');
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./dbconfig');

const pool = mysql.createPool(dbconfig);
const app = express();





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