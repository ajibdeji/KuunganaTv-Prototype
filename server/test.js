const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const formidable=require('formidable');
const ffmpeg=require('fluent-ffmpeg');
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

// Form Upload 

app.get('/formupload', (req, res) => {
    res.sendFile(adminPath + '/test.html');
});
app.post('/fileupload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //var absoluteAppPath='C:\\xampp\\htdocs\\KuunganaTv-Prototype\\';
      
      var oldPath = files.filetoupload.path;
      
      var mediaFolder = publicPath+"/media/";
      fs.existsSync(mediaFolder) || fs.mkdirSync(mediaFolder);
      var mediaFile=files.filetoupload.name;
  
      var fileNameExt=path.parse(mediaFile);
      
      var fileName=fileNameExt.name;
      
      var fileFolder=mediaFolder+"/"+fileName+'/';
     fs.existsSync(fileFolder) || fs.mkdirSync(fileFolder);
     var originalFolder=fileFolder+'/original/';
     var hlsFolder=fileFolder+'/hls/';
 
      fs.existsSync(originalFolder) || fs.mkdirSync(originalFolder);
      fs.existsSync(hlsFolder) || fs.mkdirSync(hlsFolder);
      
        //Insert Logic to create media db doc with title name and use that name for folder name.
        // Name must be unique


        ///End of Insert Logic

      

      var newPath = originalFolder +'/'+files.filetoupload.name;
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        var command=ffmpeg(newPath);
        command
        // set hls segments time
        .addOption('-hls_time', 3)
        // include all the segments in the list
        .addOption('-hls_list_size',0)
        // start number
        .addOption('-start_number', 1)
        // setup event handlers
        .on('end', function() {
          console.log('file has been converted succesfully');
        })
        .on('error', function(err) {
          console.log('an error happened: ' + err.message);
        })
        // save to file
        .save(hlsFolder+fileName+'.m3u8');
            
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
app.listen(port, () => {
    console.log(`server is up on port 4000`);
});