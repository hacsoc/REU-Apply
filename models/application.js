var mongoose = require('mongoose');

var appSchema = mongoose.Schema({
    reuId: String,
    status: String,
    name: String,
});

module.exports = mongoose.model('Application', appSchema);
