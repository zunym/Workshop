const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bp = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const utils = require('./libs/mysql_utils');

const app = express();
app.use(cors());

const dbconfig = require('./dbconfig');
const pool = mysql.createPool(dbconfig);

const multipart = multer({ dest: path.join(__dirname, 'temp') });

const INSERT_REPLY = 'INSERT INTO replies(_name, _email, _phone, _attending) VALUES (?,?,?,?)';

const insertReply = utils.mkQuery(INSERT_REPLY, pool);

app.post('/reply', multipart.none('_name, _email, _phone, _attending'), bp.urlencoded({ extended: true }),
    (req, resp) => {
        console.log("req.body", req.body);
        // fs.readFile(req.body.path, (err) => {
        //     if (err) 
        //         return resp.status(400).json({ error: err });
            
            insertReply([req.body._name, req.body._email, req.body._phone, req.body._attending])
                .then(() => {
                    resp.status(202).json({});
                })
                .catch(err => resp.status(400).json({ error: err }))
                // .finally(() => { fs.unlink(req.body, () => { }) })
            // }
        // )
    }
)

app.use(express.static(path.join(__dirname, 'public/pafday24_angular')));

pool.getConnection((err, conn) => {
    if (err) {
        console.log('start error:', err);
        process.exit(-1);
    }
    conn.ping(err => {
        if (err) {
            console.log('PING error:', err);
            process.exit(-1);
        }
        conn.release()
        const PORT = parseInt(process.argv[2]) ||
            parseInt(process.env.APP_PORT) || 3000

        app.listen(PORT, () => {
            console.info('application started on %d at %s', PORT, new Date());
        });
    });
})