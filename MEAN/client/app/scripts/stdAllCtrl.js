'use strict';

angular.module('writing')
.controller('stdAllCtrl',['$scope', 'apiService', '$state', 'system', function($scope, apiService, $state, system){
    
    $scope.tableRowClicked = function(item){
        console.log("table row is clicked");  
        console.log(item);
        //$state.go('app.status',{'_id':$scope._id, 'sid':$scope.sid});	
        $state.go('app.stddetails',{'id':item._id});
    };
    
    $scope.logout = function(){
        system.logout();
    }
    
    $scope.loadAllContent = function(){
        apiService.getAllWriting().get()
        .$promise.then(
            function(response){
                if (response.status.code == 10000){
                    console.log("all data received successfully");
                    console.log(response.data);
                    //get data belong a particular user
                    $scope.writingList = [];
                    for (var i=0; i<response.data.length; i++){
                        if(response.data[i].user_id === $scope.user_id){
                            $scope.writingList.push(response.data[i]);
                        }  
                    };                    
                    console.log($scope.writingList);
                    
                }else if ((response.status.code == 10006) || (response.status.code == 10007)){
                    $state.go("app");
                }
            },
            function(response){
                console.log("all data received failed");
            }
        );
    }
    
    
    $scope.$on('$viewContentLoaded', function(){
        console.log("student all submission view is loaded");
        $scope.loadAllContent();
        $scope.user_id = JSON.parse(sessionStorage.userInfo)._id;
        $scope.userName = JSON.parse(sessionStorage.userInfo).email;
    });
    
    $scope.$on('$destroy', function(){
        console.log("student all submission is destroy"); 
    });
    
    
}]);