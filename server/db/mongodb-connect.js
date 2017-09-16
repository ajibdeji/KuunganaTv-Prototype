const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Kuungana', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Database');
    }

    console.log('Connected to Database');
    db.close();
});