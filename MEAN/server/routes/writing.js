var express = require('express');
var router = express.Router();

var Writings = require('../models/writing');
var Users  = require('../models/users');


var Verify = require('./verify');


/* GET home page. */

router.route(['/', '/:id', '/grading/:id'])
.all(Verify.verifyOrdinaryUser, function(req, res, next){
	//console.log("auth done");
	next();
});


router.get('/',function(req, res, next){
	Writings.find({})
	.exec(function(err,writings){

		if (err){
			res.json({status:{isSuccess:false, msg:"server error", code:10001}});
		}else{
			res.json({status:{isSuccess:true, msg:"", code:10000}, data:writings});
		}
	
	});
});

//get a particular writing according to the writing id
router.get('/:id',function(req, res, next){
	//console.log(req.params.id);
	Writings
	//.find({user_id:req.params.id})
	//.find({$or:[{user_id:req.params.id}, {tutor_id:req.params.id}]})
	.find({_id:req.params.id})
	.exec(function(err,writings){
		if (err){
			res.json({status:{isSuccess:false, msg:"server error", code:10001}});
		}else{
			res.json({status:{isSuccess:true, msg:"", code:10000}, data:writings});
		}
	});
});

router.post('/', function(req, res, next) {


	Users.find({isStudent:false})
	.exec(function(err,tutors){
		if (err){
			res.json({status:{isSuccess:false, msg:"server error", code:10001}});
		}else{
			if (tutors.length == 0){
				res.json({status:{isSuccess:false, msg:"no available tutors", code:10009}});
			}else{
				//randomly selected a tutor and get it's id
				var index = Math.floor(Math.random() * tutors.length);
				var selectedTutorID = tutors[index]._id;


				var writing = new Writings();
				writing.content = req.body.content;
				writing.num_of_word = req.body.num_of_word;
				writing.user_id = req.body.user_id;
				writing.tutor_id = selectedTutorID;

				writing.save(function(err,writing){
					if (err){
						res.json({status:{isSuccess:false, msg:"server error", code:10001}});
					}else{
						res.json({status:{isSuccess:true, msg:"", code:10000}, data:writing});
					}
				});
			}
		}
	});

});

// update the writing accoridng to the _id of the writing
router.put('/:id', function(req, res, next){

	var query = {'_id': req.params.id};

	Writings.findOneAndUpdate(query, {$set:{"rating":req.body.rating}}, {new:true}, function(err, data){
    	if (err){
    		if (err.name === "CastError"){
    			res.json({status:{isSuccess:false, msg:"rating casting error (not a number)", code:10002}});
    		}else{
    			res.json({status:{isSuccess:false, msg:"server error", code:10001}});
    		}
    		
    	}else{
    		res.json({status:{isSuccess:true, msg:"", code:10000}, data:data});
    	}
	});
});


// graded the content by the tutor
router.put('/grading/:id', function(req, res, next){

	var query = {'_id': req.params.id};
	var updateContent = {"graded_content":req.body.graded_content, "is_graded":true};

	Writings.findOneAndUpdate(query, {$set:updateContent}, {new:true}, function(err, data){
    	if (err){
   			res.json({status:{isSuccess:false, msg:"server error", code:10001}});    		
    	}else{
    		res.json({status:{isSuccess:true, msg:"", code:10000}, data:data});
    	}
	});
});

module.exports = router;



