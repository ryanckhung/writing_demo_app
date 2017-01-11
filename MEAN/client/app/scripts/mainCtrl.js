'use strict';

angular.module('writing')
.controller('mainCtrl',['$scope', 'apiService', '$state', function($scope, apiService, $state){
    
    $scope.errMsg = {isShow:false, msg:""};
    
    $scope.signup = function(){
        var jsonData = {email:$scope.email, password:$scope.password, isStudent:$scope.isStudent}
        apiService.register().save(jsonData)
        .$promise.then(
            function(response){
                if (response.status.code == 10003){
                    $scope.errMsg = {isShow:true, msg:"user already exist"};
                }else if (response.status.code == 10005){
                    $scope.errMsg = {isShow:true, msg:"wrong password"};
                }else if (response.status.code == 10004){
                    $scope.errMsg = {isShow:true, msg:"user not exist"};
                }else{
                    console.log("signup success");
                    sessionStorage.token = response.data.token;
                    sessionStorage.userInfo = atob(response.data.token.split('.')[1]);
                    
                    if (JSON.parse(sessionStorage.userInfo).isStudent){
                        $state.go('app.stdsubmit');    
                    }else{
                        console.log("goto the teacher path");
                        $state.go('app.tutall');
                    }
                }
            },
            function(response){
                console.log("signup fail");
                console.log(response);
                $scope.errMsg = {isShow:true, msg:"signup fail"};
            }
        );
    }
    
    $scope.login = function(){
        var jsonData = {email:$scope.email, password:$scope.password, isStudent:$scope.isStudent}
        apiService.login().save(jsonData)
        .$promise.then(
            function(response){
                if (response.status.code == 10003){
                    $scope.errMsg = {isShow:true, msg:"user already exist"};
                }else if (response.status.code == 10005){
                    $scope.errMsg = {isShow:true, msg:"wrong password"};
                }else if (response.status.code == 10004){
                    $scope.errMsg = {isShow:true, msg:"user not exist"};
                }else if(response.status.code == 10008){
                    $scope.errMsg = {isShow:true, msg:"user alredy exist in diff. role"};
                }else{
                    console.log("login success");
                    sessionStorage.token = response.data.token;
                    sessionStorage.userInfo = atob(response.data.token.split('.')[1]);
                    
                    if (JSON.parse(sessionStorage.userInfo).isStudent){
                        $state.go('app.stdsubmit');    
                    }else{
                        console.log("goto the teacher path");
                        $state.go('app.tutall');
                    }
                    
                }
            },
            function(response){
                $scope.errMsg = {isShow:true, msg:"login fail"};
            }
        );        
    }

	$scope.submit = function(){
        if (($scope.email != undefined) && ($scope.password != undefined) && ($scope.isStudent != undefined) && ($scope.isLogin != undefined)) {
            console.log($scope.isLogin);
            if ($scope.isLogin == 'true'){
                console.log("login");
                $scope.login();
            }else{
                console.log("signup");
                $scope.signup();
            }
        }else{
            console.log("not enough info");
            $scope.errMsg = {isShow:true, msg:"Please input all the fields."};
        }
	}

    
    $scope.$on('$viewContentLoaded', function(){
        console.log("login/sigup view is loaded");
    });
    
    $scope.$on('$destroy', function(){
        console.log("login/sigup view is destroy"); 
    });
    
}]);