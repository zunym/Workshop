//load libs
const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1')
//middleware
const bodyParser = require('body-parser');
//render lib
const hbs = require('express-handlebars');
//create an anstance of express
const app = express()

//Configure handlers
app.engine('hbs', hbs({defaultLayout:'main.hbs'})); //Initialize express handlebars
app.set('view engine','hbs') //express instance to store and retrieve variables.
//app.set('views',path.join(__dirname,'my-views'))

// app.get('/uuid',(req,resp)=>{

//     const uuid = uuidv1();
//     resp.status(200);
//     resp.format({
//         'text/html':()=>{
//             resp.render('uuid',{uuid:uuid});
//            // resp.send(`<h1><code${uuid}code></h1>`);
//         },
//         'application/json':()=>{
//             resp.json({uuid:uuid,
//             generated_on: (new Date()).toString()});
//         },
//         'text/plain':()=>{
//             resp.send(uuid);
//         },
//         'default':()=>{
//             resp.send(406).end();
//         }
//     })      
// })
app.get('api/cart', (req,resp)=>{
    cons
})
//route public
app.use(express.static(path.join(__dirname,'public')));

//server
PORT= parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT,(res,resp)=>{
    console.log(`Listen port on ${PORT} at ${new Date()}`)
})