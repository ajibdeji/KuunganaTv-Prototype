const fs = require('fs');
var { mongoose } = require('../db/mongoose');


var { Channel } = require('../models/channel');
var { Mediafile } = require('../models/mediafile');
var {User}=require('../models/user');
var {ObjectID}=require('mongodb');

var multer=require('multer');
var formidable = require('formidable');
const Mime = require('mime');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/media')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + Mime.getExtension(file.mimetype))
    }
  });
var upload = multer({ storage: storage });

module.exports = function(router) {

    router.post( '/upload', upload.single( 'file' ), function( req, res, next ) {
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

    router.get('/media', (req, res) => {
        Mediafile.find().then((mediafiles)=>{
            res.send({mediafiles});
            console.log(mediafiles);
        }, (e)=>{
            res.status(400).send(e); 
        });
            console.log(req.body);
    });

    router.delete('/media', (req, res) => {
        var id=req.body.id;
       console.log(id);
        if (!ObjectID.isValid(id)){
           return res.status(404).send({message: "Invalid Object Id"});
       }
       Mediafile.findByIdAndRemove(id).then((mediafile)=>{
           if(!mediafile){
               return res.status(404).send({"statusText":"Media file not found"});
           }
           fs.unlink('server/media/'+mediafile.file+'', (err) => {
               if (err) throw err;
               console.log('successfully deleted file');
             });
          res.send({mediafile});
          console.log(mediafile);
       }, (e)=>{
          res.status(400).send(e); 
       });
        console.log(req.body);
    });
   
    router.patch('/media', (req, res) => {
       var id = req.body.id;
       var body={
           name:req.body.name
       };
   
       if (!ObjectID.isValid(id)){
           return res.status(404).send({message: "Invalid Object Id"});
       }
   
       Mediafile.findByIdAndUpdate(id, {$set:{"name":body.name}}, {new: true}).then((media)=>{
           if (!media){
               return res.status(404).send({message: "Media doesn't exist"});
           }  
           res.send({media});
       }).catch((e)=>{
           res.status(400).send({ message: "Error Occured",e}); 
       });
   });

    router.post('/channels', (req, res) => {
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

    router.get('/channels', (req, res) => {
        Channel.find().then((channels)=>{
            res.send({channels});
            console.log(channels);
        }, (e)=>{
            res.status(400).send(e); 
        });
            console.log(req.body);
    });

    router.patch('/channels/:id', (req, res) => {
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

    router.post('/user', (req, res) => {
        var name=req.body.name;
        var email=req.body.email;
        var pass=req.body.password;
    
        if(name==null|| name.trim().length==0||email==null|| email.trim().length==0||pass==null|| pass.trim().length==0)
            return res.status(500).send({message:"All fields are required"});
        var user = new User({
            name: req.body.name,
            email: req.body.email
        });
        user.setPassword(req.body.password);
    
        user.save().then((user) => {
            var token;
            token = user.generateJwt();
            
            console.log(user);
            res.status(200).send({message:"Registration Successful"});
        }, (e) => {
            return res.status(500).send({message:"error occured"});
            console.log("error occured");
        });   
    });
        return router;
}