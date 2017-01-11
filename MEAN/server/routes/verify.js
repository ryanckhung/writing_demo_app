var User = require('../models/users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    //console.log("verify ordinary user");
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                res.json({status:{isSuccess:false, msg:"you are not auth.", code:10006}});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                //console.log(decoded);
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        res.json({status:{isSuccess:false, msg:"no token provided (please login again)", code:10007}});
    }
};



