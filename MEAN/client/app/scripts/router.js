'use strict';

angular.module('writing',['ngResource','ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('app', {
        url:'/',
        views: {
            'content': {
                templateUrl : 'views/main.html',
                controller  : 'mainCtrl'
            }
        }
    })

    .state('app.stdsubmit', {
        url:'stdsubmit',
        views: {
            'content@': {
                templateUrl : 'views/std_submit.html',
                controller  : 'stdSubmitCtrl'
            }
        }
    })
    
    .state('app.stdall', {
        url:'stdall',
        views: {
            'content@': {
                templateUrl : 'views/std_all.html',
                controller  : 'stdAllCtrl'
            }
        }
    })
    
    .state('app.stddetails', {
        url:'stddetails?id',
        views: {
            'content@': {
                templateUrl : 'views/std_details.html',
                controller  : 'stdDetailsCtrl'
            }
        }
    })
    
    .state('app.tutall', {
        url:'tutall',
        views: {
            'content@': {
                templateUrl : 'views/tut_all.html',
                controller  : 'tutAllCtrl'
            }
        }
    })
    
    .state('app.tutdetails', {
        url:'tutdetails?id',
        views: {
            'content@': {
                templateUrl : 'views/tut_details.html',
                controller  : 'tutDetailsCtrl'
            }
        }
    })
    
    /*
    .state('app.lms', {
        url:'crlms',
        views: {
            'content@': {
                templateUrl : 'views/lms.html',
                controller  : 'lmsCtrl'
            }
        }
    })
	.state('app.dashboard', {
        url:'dashboard?vm_name?_id?sid',
        views: {
            'content@': {
                templateUrl : 'views/dashboard.html',
                controller  : 'dashboardCtrl'
            }
        }
    })
    */
        
    $urlRouterProvider.otherwise('/');
});
