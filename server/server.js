/* global process, __dirname */

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const _ = require('lodash');

const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const port = process.env.PORT || 4000;

var { mongoose } = require('./db/mongoose');
var { Channel } = require('./models/channel');
var { Mediafile } = require('./models/mediafile');
var {ObjectID}=require('mongodb');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(publicPath));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/', (req, res) => {

});

// Form Upload 

app.get('/formupload', (req, res) => {
    res.sendFile(adminPath + '/test.html');
});
app.post('/fileupload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/xampp/htdocs/KuunganaTv-Prototype/public/media/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
});

// Api 

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

app.get('/channels', (req, res) => {
   Channel.find().then((channels)=>{
      res.send({channels});
      console.log(channels);
   }, (e)=>{
      res.status(400).send(e); 
   });
    console.log(req.body);
});

app.patch('/channels/:id', (req, res) => {
    var id = req.params.id;
    var body=_.pick(req.body, ['name', 'description']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send({message: "Invalid Object Id"});
    }

    body.name=req.body.name;
    body.description=req.body.description;

    Channel.findByIdAndUpdate(id, {$set:body}, {new:true}).then((channel)=>{
        if (!channel){
            return res.status(404).send({message: "Channel doesn't exist"});
        }  
        res.send({channel});
        
    }).catch((e)=>{
        res.status(400).send({ message: "Error Occured",e}); 
    });
        console.log(req.body);
});
app.listen(port, () => {
    console.log(`server is up on port 4000`);
});