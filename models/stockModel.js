var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockSchema = new Schema ({
    code: String
});

var Stocks = mongoose.model('Stocks', stockSchema);

module.exports = Stocks;

