var mongoose = require('mongoose');
var Channel = mongoose.model('Todo', {
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