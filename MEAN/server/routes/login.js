var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Users  = require('../models/users');


/* GET home page. */
router.post('/', function(req, res, next) {
	//console.log(req.body.email);

	Users.findOne({'email':req.body.email}, function(err, user){

		//console.log(user);
		//console.log(req.body);

		if (err){
			res.json({status:{isSuccess:false, msg:"server error"}});
		}else{
			if (user != null){
				var validUser = user.validPassword(req.body.password);
				var validRole = false;
				if (user.isStudent.toString() === req.body.isStudent.toString()){
					validRole = true;
				}				

				if (validUser && validRole){
					var token = user.generateJwt();
					res.json({status:{isSuccess:true, msg:"", code:10000}, data:{token:token}});
				}else if(validRole == false){
					res.json({status:{isSuccess:false, msg:"user already exist as diff. role", code:10008}});
				}else{
					res.json({status:{isSuccess:false, msg:"wrong password", code:10005}});
				}
			}else{
				res.json({status:{isSuccess:false, msg:"user not exit", code:10004}});
			}
		}
	});


	
  	
});

module.exports = router;


