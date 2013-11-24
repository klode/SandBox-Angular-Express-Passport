'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('AdminCtrl', function ($scope, $http) {
      $scope.users = [];
      $http.get('/api/users').
	  success(function (data, status, headers, config) {
	      $scope.users = data;
	  });
  }).
  controller('UsersCtrl', function ($scope, $http) {
      $scope.books = [];
      $http.get('/api/books').
	  success(function (data, status, headers, config) {
	      $scope.books = data;
	  });
  }).
  controller('LoginCtrl', function ($scope, $location, $http, AuthenticationService) {
      $scope.sampleUsers = [];
      $http.get('/api/test/users').
	  success(function (data, status, headers, config) {
	      $scope.sampleUsers = data;
	  });
    
      $scope.login = function() {
	  
	  AuthenticationService.login(this.credentials).success(function() {
              $location.path('/'); 
	      // TODO: route back to where user was coming from (before login page)
	  });
	
    };

  }).
  controller('NavbarCtrl', function ($scope, $location) {

    $scope.getActive = function(path) {
	// console.log($location.path().substr(0, path.length));
	if ($location.path().substr(0, path.length) == path) {
	    return "active"
	} else {
	    return ""
	}
    }
  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
