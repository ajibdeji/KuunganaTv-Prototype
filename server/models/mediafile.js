var mongoose = require('mongoose');
var Mediafile = mongoose.model('Mediafile', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

module.exports = { Mediafile };