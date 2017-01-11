angular.module('writing')

.constant('baseURL', "http://localhost:3000/")

.service('apiService', ['$resource', 'baseURL', function($resource, baseURL){

	this.login = function(){
		return $resource(baseURL + "login", null, {
			save:{
				method:'POST'
			}
		});
	};

	this.register = function(){
		return $resource(baseURL + "register", null, {
			save:{
				method:'POST'
			}
		});
	};

	this.getAllWriting = function(){
		return $resource(baseURL + "writing", null, {
			get:{
				method:'GET',
				headers:{'x-access-token': sessionStorage.token}
			}
		});
	};

	this.postWriting = function(){
		return $resource(baseURL + "writing", null, {
			save:{
				method:'POST',
				headers:{'x-access-token': sessionStorage.token}
			}
		});
	};

	this.getParticularUserWriting = function(){
		return $resource(baseURL + "writing/:id", null, {
			get:{
				method:'GET',
				headers:{'x-access-token': sessionStorage.token}
			}
		});
	};

	this.updateOnParticularWriting = function(){
		return $resource(baseURL + "writing/grading/:id", null, {
			update:{
				method:'PUT',
				headers:{'x-access-token': sessionStorage.token}
			}
		});
	};


}]);
