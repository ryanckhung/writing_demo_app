'use strict';

angular.module('writing')
.controller('stdSubmitCtrl',['$scope', 'apiService', '$state', 'system', function($scope, apiService, $state, system){
    
    $scope.test = "std submit";
    $scope.errMsg = {isShow:false, msg:""};
    
    
    $scope.textAreaChange = function(){
        console.log("text area change");
        $scope.num_of_word = $scope.content.split(" ").length;
    };
    
    $scope.logout = function(){
        system.logout();
    }
    
    $scope.submitWriting = function(){
        if((!sessionStorage.userInfo) || (sessionStorage.userInfo == null)){
            console.log("quit immediately");
            $state.go("app");
            return;
        }
        var userID = JSON.parse(sessionStorage.userInfo)._id;
        var jsonData = {user_id:userID, content:$scope.content, num_of_word:$scope.num_of_word};
        
        console.log(jsonData);
        
        apiService.postWriting().save(jsonData)
        .$promise.then(
            function(response){
                if (response.status.code == 10000){
                    console.log("writing submitted successfully");
                    $scope.errMsg = {isShow:true, msg:"writing submitted successfully"};   
                    $scope.content = null;
                    $scope.num_of_word = 0;
                }else if ((response.status.code == 10006) || (response.status.code == 10007)){
                    $state.go("app");
                }else{
                    console.log("writing submitted fail");
                    $scope.errMsg = {isShow:true, msg:"writing submission fail. please re-submit"};  
                } 
            },
            function(response){
                console.log("writing submitted fail");
                $scope.errMsg = {isShow:true, msg:"writing submission fail"};  
            }
        );
        
    };
    
    
    $scope.submit = function(){
        console.log("submit button clicked");
        
        
        if($scope.content == undefined){
            $scope.errMsg = {isShow:true, msg:"content must with at least 20 words"};
        }else if ($scope.num_of_word < 20){
            $scope.errMsg = {isShow:true, msg:"content must with at least 20 words."};
        }else{
            console.log("submit to the server");
            $scope.submitWriting();
        }
    };
    
    
    $scope.$on('$viewContentLoaded', function(){
        console.log("student writing submission view is loaded");
        $scope.num_of_word = 0;
        $scope.errMsg = {isShow:false, msg:""};  
        $scope.userName = JSON.parse(sessionStorage.userInfo).email;
    });
    
    $scope.$on('$destroy', function(){
        console.log("student writing submission is destroy"); 
    });
    
}])