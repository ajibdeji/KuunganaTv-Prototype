/* global process, __dirname */

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const _ = require('lodash');


const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const serverPath = path.join(__dirname,'/');
const port = process.env.PORT || 4000;

var { mongoose } = require('./db/mongoose');
var { Channel } = require('./models/channel');
var { Mediafile } = require('./models/mediafile');
var {ObjectID}=require('mongodb');

var multer=require('multer');
var formidable = require('formidable');
const Mime = require('mime');

var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/media')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + Mime.getExtension(file.mimetype))
    }
  });
  var upload = multer({ storage: storage });
app.set('view engine', 'hbs');

app.use("/",express.static(publicPath));
app.use("/server", express.static(serverPath));
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

// app.get('/formupload', (req, res) => {
//     res.sendFile(adminPath + '/test.html');
// });
// app.post('/fileupload', (req, res) => {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         console.log(req.body);
//       var oldpath = files.file.path;
//       var newpath = 'server/media' + files.file.name;
//       fs.rename(oldpath, newpath, function (err) {
//           console.log("in rename");
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
// });
app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {
    
    //   if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    //     return res.status( 422 ).json( {
    //       error : 'The uploaded file must be an image'
    //     } );
    //   }
    
    //   var dimensions = sizeOf( req.file.path );
    
    //   if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
    //     return res.status( 422 ).json( {
    //       error : 'The image must be at least 640 x 480px'
    //     } );
    //   }
    var mediafile = new Mediafile({
        name: req.file.originalname.split(".")[0],
        file:req.file.filename,
        type:req.file.mimetype
    });
    mediafile.save().then((doc) => {
        console.log(doc,req.file);
    }, (e) => {
        console.log(e);
    });
    console.log(req.file)
      return res.status( 200 ).send( req.file );
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