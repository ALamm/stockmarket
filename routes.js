
'use strict';

// returns the current working dir of the Node.js process
var path = process.cwd();
var Stocks = require('./models/stockModel');
var bodyParser = require('body-parser');
var moment = require('moment');
var getStockInfo = require('./stockLookup.js');


module.exports = function (app) {

    // middleware that looks at http request
    // and will parse out JSON in the request
    // and will handle url encoded data (e.g characters converted to %20 etc)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));    

    // get the date range
    // Notice the YYYY-MM-DD format 
    var dateRange = function(val) {
        var startdate = moment();
        startdate = startdate.subtract(val, "months");
        startdate = startdate.format("YYYY-MM-DD");
        return startdate;
    }
    // default to 3 month timeline for initial page loading
    var startdate = dateRange(3);

    // SERVE UP THE INDEX.HTM FILE 
    app.get('/', function(req, res) {  
        res.sendFile(path + '/public/index.htm')
    });

    // Query the Quandl API to get Stock data for the requested date range
    app.post('/stocks/range', function(req, res) {
        // search the database 
        Stocks.find({}, function(err, data) {
            if(err) throw err;   
            getStockInfo(data, dateRange(req.body.range), res);
        });
    })

    app.get('/stocks', function (req, res) { 
        // search the database 
        Stocks.find({}, function(err, data) {
            if(err) throw err;   
            getStockInfo(data, startdate, res);
        });
    });

    app.post('/stocks', function(req, res) {
        console.log('post request: ', req.body.stock.value.name);

        //check if the Stock is already in the database
        Stocks.find({code: req.body.stock.value.name}, function(err, data) {
            if(err) throw err; 

            if(data.length === 0) {
                var newStock = Stocks({
                    code: req.body.stock.value.name
                });
                newStock.save(function(err) {
                    if(err) throw err;            
                    // search the database 
                    Stocks.find({}, function(err, data) {
                        if(err) throw err;  
                        console.log('saved new stock. db is now: \n', data)
                        getStockInfo(data, dateRange(req.body.range), res);
                    });
                });
            }
            else { res.send('duplicate') } 
        });
    });

    app.delete('/stocks', function(req, res) {
        // make sure not to delete the last document
        Stocks.find({}, function(err, data) {
            if (data.length > 1) {
                Stocks.find({ code: req.body.stock }).remove( function(err) {
                    if(err) throw err;
                    // search the database 
                    Stocks.find({}, function(err, data) {
                        if(err) throw err;    
                        console.log('delete successful. db is now: \n', data);
                        getStockInfo(data, dateRange(req.body.range), res);
                    });
                });
            }
            else { res.send('required') }
        });
    });

    // JUST FOR DEVELOPMENT - INITIALIZE THE DB WITH SOME DATA
    app.get('/stocks/setupStocks', function(req,res) {
        // seed Database
        var initialStocks = [
            {
                code: 'MSFT'
            },
            {
                code: 'GOOG'
            }                        
        ];
        Stocks.create(initialStocks, function(err, results) {
            console.log('database seeded');
            res.send(results);
        })
    })    

}