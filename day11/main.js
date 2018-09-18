//Load some libraries
const path = require('path');
const express = require('express');

//Create an instance of express
const app = express();

//Run app / Open terminalS
//nodemon will look for 
//main attribute starting file in package.json [eg:main.js]

app.use(
    express.static(//middleware to serve static files
        path.join(__dirname + 'public')
    )
); //any req come in use this rule to handle it

app.use(
    express.static(//middleware to serve static files
        path.join(__dirname + 'media')
    )
);


//Error Message Route to 404
app.use((req, resp) => {//middleware
    resp.status(404);
    resp.sendfile(path.join(__dirname, 'media', '404.png'));
});

app.listen(3000, () => {
    console.info("App started on port 3000");
    console.info('running dir is', __dirname);
    console.info('public dir is', path.join(__dirname + '/public'));
})
