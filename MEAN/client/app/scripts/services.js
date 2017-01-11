angular.module('writing')

.service('system',['$state',function($state){

	
	this.logout = function(){
		console.log("logout the system");
		sessionStorage.userInfo = null;
        sessionStorage.token = null;
        $state.go('app');		
	};
	
	
}]);