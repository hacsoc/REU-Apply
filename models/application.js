var mongoose = require('mongoose');

var appSchema = mongoose.Schema({
    name: String,
    location: String,
    school: String,
    professors: [String],
    status: String,
});

module.exports = mongoose.model('Application', appSchema);
