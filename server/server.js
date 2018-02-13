/* global process, __dirname */

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const morgan = require('morgan');


const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const serverPath = path.join(__dirname,'/');
const port = process.env.PORT || 4000;
const router=express.Router();
const appRoutes=require('./routes/api')(router);

var { mongoose } = require('./db/mongoose');
var { Channel } = require('./models/channel');
var { Mediafile } = require('./models/mediafile');
var {User}=require('./models/user');
var {ObjectID}=require('mongodb');

var multer=require('multer');
var formidable = require('formidable');
const Mime = require('mime');
var passport = require('passport');

require('./config/passport');



var app = express();

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use("/",express.static(publicPath));
app.use("/server", express.static(serverPath));
app.use(bodyParser.json());
app.use('/api',appRoutes);
app.use(passport.initialize());
app.use(passport.session());
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

//upload m
// app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {
    // var mediafile = new Mediafile({
    //     name: req.file.originalname.split(".")[0],
    //     file:req.file.filename,
    //     type:req.file.mimetype
    // });
    // mediafile.save().then((doc) => {
    //     console.log(doc,req.file);
    // }, (e) => {
    //     console.log(e);
    // });
    // console.log(req.file)
    //   return res.status( 200 ).send( req.file );
    // });
    
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

//get Media
// app.get('/media', (req, res) => {
//     Mediafile.find().then((mediafiles)=>{
//        res.send({mediafiles});
//        console.log(mediafiles);
//     }, (e)=>{
//        res.status(400).send(e); 
//     });
//      console.log(req.body);
//  });

// delete media
//  app.delete('/media', (req, res) => {
//      var id=req.body.id;
//     console.log(id);
//      if (!ObjectID.isValid(id)){
//         return res.status(404).send({message: "Invalid Object Id"});
//     }
//     Mediafile.findByIdAndRemove(id).then((mediafile)=>{
//         if(!mediafile){
//             return res.status(404).send({"statusText":"Media file not found"});
//         }
//         fs.unlink('server/media/'+mediafile.file+'', (err) => {
//             if (err) throw err;
//             console.log('successfully deleted file');
//           });
//        res.send({mediafile});
//        console.log(mediafile);
//     }, (e)=>{
//        res.status(400).send(e); 
//     });
//      console.log(req.body);
//  });

//update/edit media
// app.patch('/media', (req, res) => {
//     var id = req.body.id;
//     var body={
//         name:req.body.name
//     };

//     if (!ObjectID.isValid(id)){
//         return res.status(404).send({message: "Invalid Object Id"});
//     }

//     Mediafile.findByIdAndUpdate(id, {$set:{"name":body.name}}, {new: true}).then((media)=>{
//         if (!media){
//             return res.status(404).send({message: "Media doesn't exist"});
//         }  
//         res.send({media});
//     }).catch((e)=>{
//         res.status(400).send({ message: "Error Occured",e}); 
//     });
// });

//post channel
// app.post('/channels', (req, res) => {
//     var channel = new Channel({
//         name: req.body.name,
//         description: req.body.description
//     });
//     channel.save().then((doc) => {
//         res.send(doc);
//     }, (e) => {
//         res.status(400).send(e);
//     });
//     console.log(req.body);
// });

//get channels
// app.get('/channels', (req, res) => {
//    Channel.find().then((channels)=>{
//       res.send({channels});
//       console.log(channels);
//    }, (e)=>{
//       res.status(400).send(e); 
//    });
//     console.log(req.body);
// });

//edit/update channel
// app.patch('/channels/:id', (req, res) => {
//     var id = req.params.id;
//     var body=_.pick(req.body, ['name', 'description']);

//     if (!ObjectID.isValid(id)){
//         return res.status(404).send({message: "Invalid Object Id"});
//     }

//     body.name=req.body.name;
//     body.description=req.body.description;

//     Channel.findByIdAndUpdate(id, {$set:body}, {new:true}).then((channel)=>{
//         if (!channel){
//             return res.status(404).send({message: "Channel doesn't exist"});
//         }  
//         res.send({channel});
        
//     }).catch((e)=>{
//         res.status(400).send({ message: "Error Occured",e}); 
//     });
//         console.log(req.body);
// });

//post user
// app.post('/user', (req, res) => {
//     var name=req.body.name;
//     var email=req.body.email;
//     var pass=req.body.password;

//     if(name==null|| name.trim().length==0||email==null|| email.trim().length==0||pass==null|| pass.trim().length==0)
//         return res.status(500).send({message:"All fields are required"});
//     var user = new User({
//         name: req.body.name,
//         email: req.body.email
//     });
//     user.setPassword(req.body.password);

//     user.save().then((user) => {
//         var token;
//         token = user.generateJwt();
        
//         console.log(user);
//         res.status(200).send({message:"Registration Successful"});
//     }, (e) => {
//         return res.status(500).send({message:"error occured"});
//         console.log("error occured");
//     });   
// });

app.post('/admin/login', (req, res) => {
    console.log("in login route");
    if(!req.body.email || !req.body.password) {
        return res.status(500).send({"message": "All fields required"});
  }

  passport.authenticate('local', function(err, user, info){
      
    var token;

    // If Passport throws/catches an error
    if (err) {
      return res.status(404).json(err);
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
    
});

app.listen(port, () => {
    console.log(`server is up on port 4000`);
});

module.exports= {app};