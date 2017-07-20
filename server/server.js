const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.get('/', (req, res) => {

});
app.listen(4000, () => {
    console.log(`server is up on port 4000`);
});