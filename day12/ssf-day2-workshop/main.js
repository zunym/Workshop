//load libs
const express = require('express');
const path = require('path');

const resources =['images','public'];
const images = ["mushroom.png",
"onion.png",
"potato.png",
"pumpkin.png",
"radish.png",
"squash.png"];

const randImage = (array) =>{
    const rand = Math.random();
    const index = Math.floor(rand * images.length);
    return (images[index]);
}


//instance
var app = express()

//route

//Define our routes
// GET /image -> text/html
app.get('/image', (req, resp) => {
    resp.status(200);
    resp.type('text/html');
    resp.send(`<img src='/${randImage(images)}'>`);
});

//GET /random-image -> image/png
app.get('/random-image', (req, resp) => {
    const imageFile = randImage(images);
    resp.status(200);
    resp.type('image/png');
    resp.sendfile(path.join(__dirname, 'images', imageFile));
});
for (let res of resources) {
    console.log(`Adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}

//error
app.use((res,resp)=>{
    resp.status(404);
    resp.type('text/html');
    resp.send('<h1>Error Occured</h1>')
})

//server
PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT,(res,resp)=>{
    console.log('Listen to %d at %s', PORT,'public')
})