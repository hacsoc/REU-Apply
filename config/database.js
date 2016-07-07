module.exports = function(mongoose) {
    mongoose.connect("mongodb://localhost/reuapp");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("Successfully connected to reuapp");
    });
};
