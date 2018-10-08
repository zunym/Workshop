require('dotenv').config()
const express =  require("express"),
      mysql = require("mysql"),
      q = require("q"),
      bodyParser = require("body-parser");

      querystring = require('querystring');
      path = require('path');
      hbs = require('express-handlebars');
      request = require('request');     

var app = express();
const resources = ['public','angular'];
const NODE_PORT = process.env.PORT;
const API_URL = "/api";

//Configure express to use handlebars as the rendering engine
app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'my-views'));

//sql
const sqlFindAllGroceries = "SELECT * FROM grocery_list";
const sqlFindOneItem = "SELECT id, upc12, brand, name FROM grocery_list WHERE id=?"
const sqlFindOneName = "SELECT id, upc12, brand, name FROM grocery_list WHERE name=?"
const sqlFindOneBrand = "SELECT id, upc12, brand, name FROM grocery_list WHERE brand=?"
const sqlFindBrand = "select brand from grocery_list"
const sqlFindBoth = "SELECT * FROM grocery_list WHERE (name LIKE '%?%') || (brand LIKE '%?%')"
//`grocery_list` (`id`, `upc12`, `brand`, `name`) VALUES
//SELECT * FROM books WHERE (name LIKE '%Kenneth%') || (author LIKE '%Kenneth%');

console.log("DB USER : " + process.env.DB_USER);
console.log("DB NAME : " + process.env.DB_NAME);

/**
 * Query Pool
 * .env
 * DB_HOST="localhost"
 * DB_PORT=3306
 * user=root
 * password=password@123
 * database=grocery
 * 4
 */
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONLIMIT
    //debug: true
})

var makeQuery = (sql, pool)=>{
    console.log("SQL: ",sql);
    
    return  (args)=>{
        var defer = q.defer();
        pool.getConnection((err, connection)=>{
            if(err){
                defer.reject(err);
                return;
            }
            console.log("ARG: ",args);
            connection.query(sql, args || [], (err, results)=>{
                connection.release();
                if(err){
                    defer.reject(err);
                    return;
                }
                //console.log(">>> Result: "+ results);
                defer.resolve(results); 
            })
        });
        return defer.promise;
    }
}

//makeQuery executes
var findAllGroceries = makeQuery(sqlFindAllGroceries, pool);
var findOneItemById = makeQuery(sqlFindOneItem, pool);
var findOneItemByName = makeQuery(sqlFindOneName, pool);
var findOneItemByBrand = makeQuery(sqlFindOneBrand, pool);
var findByBrand = makeQuery(sqlFindBrand, pool);
var findOneItemBoth = makeQuery(sqlFindBoth, pool);

/**?
 * body-parser for json format
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * route
 */

// app.get("/all", (req, res)=>{
//     findAllGroceries().then((results)=>{
//         res.json(results);
//     }).catch((error)=>{
//         console.log(error);
//         res.status(500).json(error);
//     });
// });

app.get(API_URL+"/all", (req, res)=>{
    var Id = req.params;
    //console.log("All",Id);   
    findAllGroceries([Id]).then((results)=>{
        console.log("All Result",results);
        res.json(results);
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    });
});

app.get(API_URL+"/item/:itemId", (req, res)=>{
    console.log("item params !", req.params.itemId);
    var itemId = req.params.itemId;
    console.log(">>>>Item",itemId);
    findOneItemById([parseInt(itemId)]).then((results)=>{
        console.log("Item Result",results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
    
})

app.get(API_URL+"/name/:nameId", (req, res)=>{
    console.log("Name params !", req.params.nameId);
    var nameId = req.params.nameId;
    console.log(">>>>Name",nameId);
    findOneItemByName([nameId]).then((results)=>{
        console.log("Name Result",results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
    
})

app.get(API_URL+"/brand", (req, resp)=>{
    console.log("Brand params !", req.params.brandId);
    var brandId = req.params.brandId;
    console.log(">>>>Brand",brandId);
    findByBrand([brandId]).then((results)=>{
        console.log("Brand Result",results);
        //res.json(results);
        resp.status(200);
        resp.format({
            'text/html': () => {
                resp.render('index', {
                    //images: result.images,
                    searchBrand: req.query.brandId,
                    fromCache: !!result['fromCache']
                });
            },
            'application/json': () => {
                resp.json(results);
            }
        })
    }).catch((error)=>{
        res.status(500).json(error);
    })
               resp.status(200);
            resp.format({
                'text/html': () => {
                    resp.render('index', {
                        images: result.images,
                        searchTerm: req.query.searchTerm,
                        fromCache: !!result['fromCache']
                    });
                },
                'application/json': () => {
                    resp.json(result);
                }
            }) 
})

app.get(API_URL+"/brand/:brandId", (req, res)=>{
    console.log("Brand params !", req.params.brandId);
    var brandId = req.params.brandId;
    console.log(">>>>Brand",brandId);
    findOneItemByBrand([brandId]).then((results)=>{
        console.log("Brand Result",results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
    
})

//http://localhost:3000/both?brand=whonu
app.get(API_URL+"/both", (req, res)=>{
    console.log("Both Name and Brand params !", req.params.brandId);
    var brandId = req.params.brandId;
    console.log(">>>>Both Name and Brand",brandId);
    findOneItemBoth([brandId]).then((results)=>{
        console.log("Both Name and Brand Result",results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
    
})

app.get(API_URL+'/rates', (req, resp) => {

    request.get('http://data.fixer.io/api/latest', 
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

//content negotiation
app.get(API_URL+'/time',(req,resp)=>{
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

app.get(API_URL+'/httpbin',(req,resp)=>{
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


const Giphy = require('./giphy')
const GIPHY_KEY = '7cf49b91cbac420198483abde27d622f'
const giphy = Giphy(GIPHY_KEY);

app.get('/search', (req, resp) => {
    console.log('query = ', req.query);
    giphy.search(req.query.searchTerm, req.query.resultCount)
        .then(result => {
            resp.status(200);
            resp.format({
                'text/html': () => {
                    resp.render('index', {
                        images: result.images,
                        searchTerm: req.query.searchTerm,
                        fromCache: !!result['fromCache']
                    });
                },
                'application/json': () => {
                    resp.json(result);
                }
            })
        })
        .catch(err => {
            resp.status(400).json({error: err });
        })
});

app.get(['/', '/index'], (req, resp) => {
    resp.status(200).type('text/html');
    resp.render('index');
});

for (let r of resources) {
    console.info(`Addding ${r} as static resource`)
    app.use(express.static(path.join(__dirname, r)));
}

app.listen(NODE_PORT, ()=>{
    console.log(`Listening to server at ${NODE_PORT}`)
})