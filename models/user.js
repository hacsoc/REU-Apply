var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local          : {
        email      : String,
        password   : String,
    },
    linkedIn       : {
        id         : String,
        token      : String,
        email      : String,
        username   : String
    },
    profile        : {
        first_name : String,
        last_name  : String,
        gpa        : Number,
        classes    : [String],
    }   
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
