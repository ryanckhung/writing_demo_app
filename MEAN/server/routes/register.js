var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Users  = require('../models/users');


/* GET home page. */
router.post('/', function(req, res, next) {
	//console.log(req.body);

	var user = new Users();
	user.email = req.body.email;
	user.isStudent = req.body.isStudent;
	user.setPassword(req.body.password);

	user.save(function(err, user){
		if (err){
			if (err.name === 'MongoError' && err.code === 11000) {
   				 res.json({status:{isSuccess:false, msg:"dupicated info in database", code:10003}});
  			}else{
  				res.json({status:{isSuccess:false, msg:"server error", code:10001}});
  			}
		}else{
			//console.log(user);
			var token = user.generateJwt();
			res.json({status:{isSuccess:true, msg:"", code:10000}, data:{token:token}});
		}
	});


	/*
  	Users.create(req.body, function(err, user){
		if (err) throw err;
		res.json({'status':'success'});
	});
	*/
});

module.exports = router;


