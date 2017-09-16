const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const port = process.env.PORT || 5000;

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.get('/', (req, res) => {
    
});

app.get('/admin', (req, res) => {
    res.sendFile(adminPath + '/index.html');
});
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
app.listen(port, () => {
    console.log(`server is up on port 5000`);
});