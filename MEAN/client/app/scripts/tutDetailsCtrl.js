'use strict';

angular.module('writing')
.controller('tutDetailsCtrl',['$scope', 'apiService', '$state', 'system', '$stateParams', function($scope, apiService, $state, system, $stateParams){
    
    $scope.logout = function(){
        system.logout();
    };
    
    
    $scope.updateGradedContent = function(){
        apiService.updateOnParticularWriting().update({id:$scope.writingID},{graded_content:$scope.gradedContent})
        .$promise.then(
            function(response){
                console.log('updated success');
                $state.go('app.tutall');
            },
            function(response){
                console.log('update fail');
            }
        );
    };
    
    
    $scope.submitGradedContent = function(){
        console.log($scope.gradedContent);  
        var numOfWords = $scope.gradedContent.split(" ").length;
        console.log(numOfWords);
        if (numOfWords<10){
            console.log("Are you sure you are completed?");
        }else{
            console.log("You are done");
            $scope.updateGradedContent();
        }
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
        console.log("tutor details view is loaded");
        $scope.writingID = $stateParams.id;
        console.log($scope.writingID);
        $scope.getParticularWriting();
        $scope.userName = JSON.parse(sessionStorage.userInfo).email;
    });
    
    $scope.$on('$destroy', function(){
        console.log("tutor details view is destroy"); 
    });
    
}]);