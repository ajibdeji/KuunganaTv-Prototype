var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile(__dirname + '/R.mp4', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        res.end(data);
    });
});
server.listen(8000);

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'video/mp4' });
//     var stream = fs.createReadStream(__dirname + '/test.mp4');
//     stream.pipe(res);
// });

// console.log('server started at port 8000');
// server.listen(8000);