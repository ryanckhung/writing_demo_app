// grab the things we need
var crypto = require('crypto');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('../config.js');


var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isStudent: {
    	type: Boolean,
    	required: true
    },
    salt: String,
    hash: String
}, {
    timestamps: true
});

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate()+7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		isStudent: this.isStudent,
		exp: parseInt(expiry.getTime()/1000)
	}, config.secretKey);
};

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
}


// the schema is useless so far
// we need to create a model using it
var Users = mongoose.model('User', userSchema);

// make this available to our Node applications
module.exports = Users;
