var mongoose = require('mongoose');
var MediaFile = mongoose.model('Todo', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    relativePath: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

module.exports = { MediaFile };