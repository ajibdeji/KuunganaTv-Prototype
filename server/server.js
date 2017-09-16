const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const port = process.env.PORT || 4000;

var { mongoose } = require('./db/mongoose');
var { Channel } = require('./models/channel');
var { Mediafile } = require('./models/mediafile');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/', (req, res) => {

});

app.get('/admin', (req, res) => {
    res.sendFile(adminPath + '/index.html');
});

app.get('/business', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    var stream = fs.createReadStream(__dirname + '/media/test.mp4');
    stream.pipe(res);
});
app.get('/politics', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    var stream = fs.createReadStream(__dirname + '/media/R.mp4');
    stream.pipe(res);
});

app.post('/channels', (req, res) => {
    var channel = new Channel({
        name: req.body.name,
        description: req.body.description
    });
    channel.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    console.log(req.body);
});
app.listen(port, () => {
    console.log(`server is up on port 4000`);
});