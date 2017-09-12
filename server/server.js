const express = require('express');
const path = require('path');
const fs = require('fs');
const publicPath = path.join(__dirname, '../public');
const adminPath = path.join(__dirname, '../public/admin');
const port = process.env.PORT || 4000;

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.get('/', (req, res) => {

});

app.get('/admin', (req, res) => {
    app.sendFile(adminPath + '/index.html');
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
    console.log(`server is up on port 4000`);
});