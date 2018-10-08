//Load some libraries
const path = require('path');
const express = require('express');

//Create an instance of express
const app = express();
const resources = ['images','public'];
const images = ["mushroom.png",
"onion.png",
"potato.png",
"pumpkin.png",
"radish.png",
"squash.png"];

const randImage =(array)=>{
    const rand = Math.random();
    const index = Math.floor(rand * images.length);
    return(images[index]);
}

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

//Run app / Open terminalS
//nodemon will look for 
//main attribute starting file in package.json [eg:main.js]
//app.use(express.static(path.join(__dirname, 'public')));
for (let res of resources) {
    console.log(`Adding ${__dirname}, ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}

//Error Message Route to 404
app.use((req, resp) => {//middleware
    resp.redirect("/");
    //resp.status(404);
    //resp.type('text/html');
    //resp.send('<h1>Error Occured</h1>')
    //resp.sendfile(path.join(__dirname, 'media', '404.png'));
});


//server
PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
app.listen(PORT,(res,resp)=>{
    console.log('Listen to %d at %s', PORT,'public');
    console.info('running dir is', __dirname);
    console.info('public dir is', path.join(__dirname + '/src'));
})

// app.listen(3000, () => {
//     console.info("App started on port 3000");
//     console.info('running dir is', __dirname);
//     console.info('public dir is', path.join(__dirname + '/src'));
// })