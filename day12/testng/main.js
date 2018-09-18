//step 1: Load libs
const path = require('path');
const express = require('express');

//step 2: create an instance of the application
const app = express();

//step 3: define routes
// app.use(
//     express.static(//middleware to serve static files
//         path.join(__dirname, 'public')
//     )
// ); //any req come in use this rule to handle it

app.use(
    express.static(//middleware to serve static files
        path.join(__dirname, 'angular')
    )
);
// app.use(
//     express.static(//middleware to serve static files
//         path.join(__dirname + 'media')
//     )
// );


//Error Message Route to 404
app.use((req, resp) => {//middleware
    //resp.redirect('/404.html');
    resp.redirect('/404.html');
    // resp.status(404);
    // resp.sendfile(path.join(__dirname, 'public', '404.png'));
});

//step 4: start the server
//Evaluation order : cmd arguments, env varialbe, default
//export APP_PORT="8080" : call the enviroment variable
//process is node process, current process
//parseInt=try to use as number, convert string to integer
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// console.log(process.argv);
// console.log('>>> APP_PORT', process.env.APP_PORT);

app.listen(PORT,()=>{
    console.info(`Port is running at ${PORT} at ${new Date()}`);
    console.info("directory is at ",__dirname);
    console.info("Public path is ", path.join(__dirname+'/public'))
})