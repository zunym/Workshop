//angular universal
// require('zone.js/dist/zone-node');
// require('reflect-metadata');

// //angular core
 //const core = require('@angular/core');

// //angular renderer
// const ngRenderer = require('@nguniversal/express-engine');

// //Load your angular application
// const server = require('./dist/universal-demo-server/main');


//For Express
const path = require('path');
const mysql = require('mysql');
//const cacheControl = require('express-cache-controller');
const express = require('express');
const hbs = require('express-handlebars');

// const pool = mysql.createPool({
// 	host: 'localhost', port: 3306, 
// 	user: 'fred', password: 'fred',
// 	database: 'sakila',
// 	connectionLimit: 4
// });

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONLIMIT
  //debug: true
})

const mkQuery = (sql, pool) => {
	return (function() {
		return (new Promise((resolve, reject) => {
			pool.getConnection((err, conn) => {
				if (err)
					return (reject(err));
				conn.query(sql, Object.values(arguments),
					(err, result) => {
						conn.release();
						if (err)
							return (reject(err));
						resolve(result);
					})
			})
		}));
	})
}

core.enableProdMode();

const FILMS_SQL = 'select film_id, title, description, release_year, rating, special_features from film limit ? offset ?';
const films = mkQuery(FILMS_SQL, pool);

const app = express();

// app.engine('html', ngRenderer.ngExpressEngine(
//   {
//     bootstrap: server.AppServerModuleNgFactory,
//     providers: []
//   })
// );
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'dist/universal-demo'));

/*
//Configure express to use handlebars as the template engine
app.engine('hbs', hbs())
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
*/

app.get('/films',
  cacheControl({ public: true, maxAge: 60 }),
  (req, res) => {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;
      console.log('query params: ', req.query);
      films(limit, offset)
        .then(result => {
          res.status(200);
          res.format({
            //Accept
            'application/json': () => { res.json(result); },
            'text/html': () => {
              //Render angular
              res.render('index', {
                req: req,
                res: res,
                providers: [
                  { provide: 'sakila', useValue: result },
                  { provide: 'queryparam',  useValue: req.query }
                ]
              })
              //render handlebars
              //res.render('sakila', { films: result })
            }
          })
        })
        .catch(err => {
          res.status(400);
          res.format({
            'application/json': () => { res.json({error: err}); }
          })
        });
    }
    );

app.use(express.static(path.join(__dirname, 'dist/universal-demo')));

pool.getConnection((err, conn) => {
	if (err)
		throw err;
	conn.ping(err => {
		if (err)
			throw err;
		conn.release();
		const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
		app.listen(PORT, () => {
			console.info('Application started on port %d at %s', PORT, new Date());
		});
	});
})

