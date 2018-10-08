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

//Create routes
app.get('/rates', (req, resp) => {

    request.get('http://data.fixer.io/api/latest', 
        //{ qs: { access_key: '__YOUR_API_KEY__' } },
        { qs: { access_key: 'ce94f182e906d4deb5c0ed7e92efe2d9' } },
        (err, response, body) => {
            if (err) {
                resp.status(400);
                resp.type('text/plain');
                resp.send(err);
                return;
            }

            //Parse the JSON string to JSON
            const result = JSON.parse(body);
            const rates = result.rates;
            const rateArray = []
            for (let c of Object.keys(rates)) 
                rateArray.push({ currency: c, rate: rates[c] });

            resp.status(200);
            resp.render('rates', { 
                baseRate: result.base,
                date: result.date,
                rates: rateArray, 
                layout: false 
            });
        }
    )

});

app.get('/httpbin',(req,resp)=>{
    const param ={
        name: 'fred',
        email: 'fred@email.com'
    };
    //console.log('param = '+ qs.stringify(param) );
    request.get('http://httpbin.org/get?',
    {
        qs:{
            name:'bred',
            email: 'bred@email.com'
        }
    },
    (err,result,body)=>{
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