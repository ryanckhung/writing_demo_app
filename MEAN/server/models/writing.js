var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var writingSchema = new Schema({
    content:{
    	type: String,
        required: true,
    },
    graded_content:{
    	type: String
    },
    num_of_word:{
    	type: Number,
    	required: true
    },
    rating:{
    	type: Number,
    	min: 1,
    	max: 5
    },
    is_paid:{
    	type:Boolean,
    	default: false
    },
    is_graded:{
    	type:Boolean,
    	default: false
    },
    user_id:{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Users'
    },
    tutor_id:{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Users'
    }
}, {
    timestamps: true
});


// the schema is useless so far
// we need to create a model using it
var Writings = mongoose.model('Writing', writingSchema);

// make this available to our Node applications
module.exports = Writings;
