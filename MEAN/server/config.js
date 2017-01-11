/* ========================================================== 
    error code
    10000: success
    10001: unknow server error
    10002: database attribute type (casting) error 
    10003: unique data; not allow to create the same data
    10004: user not exist
    10005: wrong password
    10006: not auth
    10007: no token provided
	10008: user already signup as diff. role
	10009: no available tutors
   ========================================================== */


module.exports = {
	'secretKey' : '12345-67890-09876-54321',
	'mongoUrl' : 'mongodb://localhost:27017/grading'
}

