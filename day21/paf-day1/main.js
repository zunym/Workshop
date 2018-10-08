const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//config of db
const dbconfig = {
    host: 'localhost' , port:3306,
    user: 'root', password:'Putu542328',
    database:'addressbook',
    connectionLimit:4
};

//pool for mysql
const pool = mysql.createPool(dbconfig)

console.log("Database Name:",dbconfig.database);
console.log("User Name:",dbconfig.user);

const app = express();
app.use(bodyParser.urlencoded());

app.post('/add_friend',(req,resp)=>{
    pool.getConnection((err,conn)=>{
        const FRIENDS_INSERT = 'insert into friends (email,last_name,nickname,dob) values (?,?,?,?)';
        if(err){
            console.log("DB Error",err);
            process.exit(-1);
        }
        conn.query(
            FRIENDS_INSERT, [req.body.email,req.body.last_name,req.body.nickname,req.body.dob], 
            (err,result)=>{
                conn.release();
                if(err){
                    console.log("Query Error",err);
                    return resp.status(400).json({error:err});
                }

                resp.status(200);
                resp.format({
                    'application/json':()=> resp.json(result),//resp.json({success:true}),
                    default:()=> resp.json(result)//resp.json({success:true})
                    
                })
            }
        )

    })
});

app.get('/friends',(req,resp)=>{
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    pool.getConnection((err,conn)=>{
        if(err){
            console.log("DB Error",err);
            process.exit(-1);
        }
        conn.query(
            'select * from friends limit ? offset ?',[limit,offset], //http://localhost:3000/friends?limit=1&offset=1
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

});

//Serves from public the dist directory
app.use(express.static(path.join(__dirname, 'public')))
console.log("Current base path: ",__dirname + "/public");

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


// const name = process.argv[2];
// pool.getConnection((err,conn)=>{
//     if(err){
//         console.log("error",err);
//         process.exit(-1);
//     }
//     conn.query('select * from friends where nickname = ?',[name],
//         (err,result)=>{
//             conn.release();
//             if(result.length)
//                 console.info('result',result)
//             else
//                 console.info("No such person");

//     })
// })