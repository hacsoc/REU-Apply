var mongoose = require('mongoose');

var reuSchema = mongoose.Schema({
    name: String,
    location: String,
    school: String,
    professors: [String],
});

module.exports = mongoose.model('REU', reuSchema);
