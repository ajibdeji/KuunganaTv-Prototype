var mongoose = require('mongoose');
var Channel = mongoose.model('Channel', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
});

module.exports = { Channel };