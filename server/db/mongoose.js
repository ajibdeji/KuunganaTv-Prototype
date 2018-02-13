var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Kuungana', function(){
    // if (err){
    // console.log("Not connected to Database: "+err)        
    // }else{
    // console.log("Connected to the database on port 27017")
    // }
});

module.exports = { mongoose };