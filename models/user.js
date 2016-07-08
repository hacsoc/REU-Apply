var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local          : {
        email      : String,
        password   : String,
    },
    linkedin       : {
        id         : String,
        token      : String,
	timestamp  : Date,
        email      : String,
    },
    profile            : {
        first_name     : String,
        last_name      : String,
	full_name      : String,
	headline       : String,
	industry       : String,
	positions      : [String],
	summary        : String,
	linkedin_url   : String,
	associations   : [String],
	interests      : [String],
	publications   : [String],
	patents        : [String],
	languages      : [String],
	skills         : [String],
	certifications : [String],
	educations     : [String],
	volunteer      : [String],
	recommendations_recieved : [String],
	dob            : String,
	honors_awards  : [String],
        courses        : [String],
	location       : String,
	major          : String,
	picture_url    : String,
    }   
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
