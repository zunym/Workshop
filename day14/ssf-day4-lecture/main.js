const express = require('express');
const path = require('path');

const uuidv1 = require('uuid/v1')
const uuidv5 = require('uuid/v5')
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs')

//post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/uuidv5', (req, resp) => {
    console.log('after req.body=', req.body);
    console.log('after req.body.namespace=', req.body.namespace);
    console.log('after req.body.uuidCount=', req.body.uuidCount);

    const ns = req.body.namespace;
    //const count = parseInt(req.query.uuidCount) || 2;
    const count = parseInt(req.body.uuidCount) || 2;
    const uuidList = [];

    for (let i = 0; i < count; i++)
        uuidList.push(uuidv5(ns,uuidv5.DNS));

    resp.status(200);
    resp.type('text/html');
    resp.render('uuidlist', { uuidList: uuidList, version: '5' })

})


//get
app.get('/uuid', (req, resp) => {

    const uuid = uuidv1();
    resp.status(200);
    resp.format({
        'text/html': () => {
            resp.render('uuid', { uuid: uuid });
            //resp.send(`<h1><code${uuid}code></h1>`);
        },
        'application/json': () => {
            resp.json({
                uuid: uuid,
                generated_on: (new Date()).toString()
            });
        },
        'text/plain': () => {
            resp.send(uuid);
        },
        'default': () => {
            resp.send(406).end();
        }
    })
})

//get input of form
app.get('/uuids', (req, resp) => {
    const count = parseInt(req.query.uuidCount) || 1;
    const uuidList = [];

    for (let i = 0; i < count; i++)
        uuidList.push(uuidv1());

    resp.status(200);
    resp.type('text/html');
    resp.render('uuidlist', { uuidList: uuidList, layout: 'abc.hbs' })

})
//route public
app.use(express.static(path.join(__dirname, 'public')));

//err
app.use((req, resp) => {
    resp.send(404);
    resp.type('text/html');
    resp.send(`<h1>Error Occured</h1>`);
})

//server
PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT, (req, resp) => {
    console.log(`Listening to %d at %s`, PORT, 'public');
})