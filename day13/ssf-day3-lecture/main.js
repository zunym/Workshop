//load libs
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const request = require('request');
const qs = require('querystring');


//instance
const app = express();

//route
//configure express to use hbs
app.engine('hbs',hbs());
app.set('view engine','hbs');
app.set('views','views');

//making http call to external api
//querystring
app.get('/httpbin',(req,resp)=>{
    const param ={
        name: 'fred',
        email: 'fred@email.com'
    };
    console.info('param = '+ qs.stringify(param) );
    request.get('http://httpbin.org/get?',
    {
        qs:{
            name:'bred',
            email: 'bred@email.com'
        }
    },
    (err,resp,body)=>{
        if(err){
            // console.err(`error: ${err}`); //ask question
            resp.status(400);
            resp.type('text/plain');
            resp.send(JSON.stringify(err)); //json to str
            return;
        }
        resp.status(200);
        resp.json(JSON.parse(body)); //str to json
    })
})

//content negotiation
app.get('/time',(req,resp)=>{
    console.log(`Accept: ${req.get('Accept')}`);
    resp.status(200);
    resp.format({
        'text/html':()=>{
            resp.send(`<h1>The current time is ${new Date()}</h1>`)
        },
        'application/json':()=>{
            resp.json({time:new Date()});
        },
        'text/plain':()=>{
            const data = {time:new Date()};
            resp.send(`This is Json as String: ${JSON.stringify(data)}`);
        },
        'default':()=>{
            resp.send(406);
            resp.end();
        }
    })
})



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