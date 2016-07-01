
module.exports = function(data, daterange, res) {

    var async = require('async');
    var Quandl = require("quandl");

    var quandl = new Quandl({
        auth_token: process.env.QUANDL,
        api_version: 3
    });
    var counter = 0;
    var arr = [];

    //whilst(condition, fn, callback)
    //Whilst will execute the function fn while condition function returns true, it will call callback when the job is done or if any error occurs.
    // see https://github.com/yongzhihuang/PentaCode/blob/master/AsyncJs/asyncWhilist.js#L15

    async.whilst (
        
        function testCondition() { return counter < data.length; },
        
        function fn (callback) {
            counter++;
            //  make a call to the Quandl database "WIKI" for each stock listed in the MongoDB
            //  get the stock names from the data that is returned in the MongoDB find command (data[0].code for example)
            quandl.dataset(
                {
                source: "WIKI",
                table: data[counter-1].code 
                }, 
                {
                exclude_column_names: true,
                // Notice the YYYY-MM-DD format 
                // start_date: "2016-03-22",
                start_date: daterange,
                // end_date: "2016-01-29",
                order:"asc",
                column_index: 4
                }, 
                function(err, response){
                    if(err) {
                        callback('err');  
                    }
                    arr.push(JSON.parse(response));
                    callback();                         // part of the async.whilst function - callback must be called once this function has completed
                }
            );             
        },
        
        function callback(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('lookup complete');
            res.send(arr);
        }
    );   
}
