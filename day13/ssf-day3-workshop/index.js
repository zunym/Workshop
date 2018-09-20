//load libs
const express = require('express');
const path = require('path');
//instance
const app = express();

//route

//error
app.use((req,resp)=>{
    resp.status(404);
    resp.type('text/html');
    resp.send('<h1>Error Occured</h1>')
})
//server
PORT = parseInt(process.argv[2]) || process.env.APP_PORT || 3000;
app.listen(PORT,(req,resp)=>{
    console.log(`Listing at %d at %s`,PORT,'public')
})