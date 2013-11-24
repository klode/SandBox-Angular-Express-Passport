'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .value('version', '0.1')
    .service('$flash', function($rootScope) {
	this.show = function(message) {
	    $rootScope.flash = message;
	};
	
	this.clear = function() {
	    $rootScope.flash = '';
	};
    })
    .factory('$session', function() {
	return {
	    get: function(key) {
		return sessionStorage.getItem(key);
	    },
	    set: function(key, value) {
		return sessionStorage.setItem(key, value);
	    },
	    unset: function(key) {
		return sessionStorage.removeItem(key);
	    },
	    clear: function() {
		return sessionStorage.clear();
	    }
	};
    })
    .service('AuthenticationService', function($http, $timeout, $q, $session, $flash) {
	this.login = function(credentials) {
	    var login = $http.post('/login', credentials);
	    login.success(function(user) {
		$session.set('user', user);
		$flash.clear();
	    }).error(function(error) {
		error = error.error ? error.error : error;
		$flash.show(error.message || error);
	    });
	    return login;
	};

	this.logout = function() {
	    var logout = $http.get('/logout');
	    logout.success(function() {
		$session.clear();
	    });
	    return logout;
	};
	
	this.user = function() {
	    var user = $session.get('user');
	    if (user) {
		var deferred = $q.defer();
		$timeout(function() {
		    deferred.resolve(user);
		}, 0);
		return deferred.promise;
	    } else {
		return $http.get('/user');
	    }
	};
    });
