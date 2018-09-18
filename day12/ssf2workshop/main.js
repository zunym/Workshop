const express = require('express');
const path = require('path');
const app = express();

//route
app.use(express.static(path.join(__dirname,'public')))

//server
PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, ()=>{
    console.log("Connection %d at %s",PORT,'public');
})
