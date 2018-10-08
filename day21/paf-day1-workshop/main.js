const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//express app
const app = express();
//app.use(bodyParser.urlencoded());

//config of db
const dbconfig = {
    host: 'localhost' , port:3306,
    user: 'benny', password:'Putu542328',
    database:'rsvp',
    connectionLimit:4
};

//pool for mysql
const pool = mysql.createPool(dbconfig)

console.log("Database Name:",dbconfig.database);
console.log("User Name:",dbconfig.user);

//end point
app.get('/rsvps',(req,resp)=>{
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    pool.getConnection((err,conn)=>{
        if(err){
            console.log("DB Error",err);
            process.exit(-1);
        }
        conn.query(
            'select * from birthday limit ? offset ?',[limit,offset], //http://localhost:3000/rsvps?limit=1&offset=1
            (err,result)=>{
                conn.release();
                if(err){
                    console.log("Query Error",err);
                    return resp.status(400).json({error:err});
                }

                resp.status(200);
                resp.format({
                    'application/json':()=> resp.json(result),
                    default:()=> resp.json(result)
                    
                })
            }
        )

    })
})

//Configure the routes
const INSERT_BDAY = 'insert into birthday (email, given_name, phone, attending, remarks) values (?, ?, ?, ?, ?)'
app.post('/rsvp', bodyParser.urlencoded({ extended: true }),
    (req, resp) => {
        pool.getConnection((err, conn) => {
            if (err) 
                return resp.status(400).json({ error: err, status: 'error' });
            conn.query(INSERT_BDAY,
                [ req.body.email, req.body.given_name, req.body.phone, req.body.attending, req.body.remarks ],
                (err) => {
                    if (err)
                        return resp.status(400).json({ error: err , status: 'error' });
                    resp.status(200).json({status: 'success'});
                }
            )
        })
    }
);


//Serves from public the dist directory
app.use(express.static(path.join(__dirname, 'public')))

//Connection
pool.getConnection((err,conn)=>{
    if(err){
        process.exit(-1);
    }
    //Start Server or not, checking first by using "ping"
    conn.ping(err=>{
        if(err){
            process.exit(-1);
        }
        conn.release();
        const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
        app.listen(PORT,()=>{
            console.info(`Listen the port %d at %s`, PORT, new Date());
        })
    })
});