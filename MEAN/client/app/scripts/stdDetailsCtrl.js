'use strict';

angular.module('writing')
.controller('stdDetailsCtrl',['$scope', 'apiService', '$stateParams', '$state', 'system', function($scope, apiService, $stateParams, $state, system){
    
    $scope.test = "std details";
    
    $scope.logout = function(){
        system.logout();
    };
    
    $scope.getParticularWriting = function(){
        apiService.getParticularUserWriting().get({id:$scope.writingID})
        .$promise.then(
            function(response){
                if (response.status.code == 10000){
                    console.log("all data received successfully");
                    console.log(response.data);
                    $scope.details = response.data[0];
                    
                }else if ((response.status.code == 10006) || (response.status.code == 10007)){
                    $state.go("app");
                }
            },
            function(response){
                console.log("all data received failed");
            }
        );
    };
    
    $scope.$on('$viewContentLoaded', function(){
        console.log("student details view is loaded");
        $scope.writingID = $stateParams.id;
        console.log($scope.writingID);
        $scope.getParticularWriting();
        $scope.userName = JSON.parse(sessionStorage.userInfo).email;
    });
    
    $scope.$on('$destroy', function(){
        console.log("student details view is destroy"); 
    });
    
}])