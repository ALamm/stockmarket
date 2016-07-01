require('dotenv').config();

var user = process.env.user;
var password = process.env.password;

module.exports = {
    // could have used a crypt/decrypt here for the password
    // could pass arguments for dev or prod environments
    getDBConnectionString: function() {
        // return 'mongodb://' + configValues.username + ':' + configValues.pwd + '@ds017258.mlab.com:17258/stockmarket';
        return 'mongodb://' + user + ':' + password + '@ds017258.mlab.com:17258/stockmarket';
 
   }
}