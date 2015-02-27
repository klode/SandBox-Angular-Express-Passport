(function() {
    'use strict';

    // Declare app level module which depends on filters, and services

    angular.module('myApp', [
        'ngRoute',
        'ui.bootstrap',
        'myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives'
    ])
    .run(['AuthenticationService', function(AuthenticationService) {
        // Get the current user when the application starts
        // (in case they are still logged in from a previous session)
        AuthenticationService.requestCurrentUser();
    }]).
    run(function($rootScope, $location, AuthenticationService) {
        // put logout() on rootscope so can be accessed anywhere
        $rootScope.logout = function() {
            var logout = AuthenticationService.logout();
            logout.then(function() {
                $location.path('/login');
            });
            return logout;
        };
    }).
    config(function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        }).
        when('/view1', {
            templateUrl: 'partials/partial1',
            controller: 'MyCtrl1'
        }).
        when('/view2', {
            templateUrl: 'partials/partial2',
            controller: 'MyCtrl2'
        }).
        when('/users', {
            templateUrl: 'partials/users',
            controller: 'UsersCtrl'
        }).
        when('/admin', {
            templateUrl: 'partials/admin',
            controller: 'AdminCtrl'
        }).
        otherwise({
            redirectTo: '/view1'
        });

        $locationProvider.html5Mode(true);
    });
})();