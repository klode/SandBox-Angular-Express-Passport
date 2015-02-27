(function() {'use strict';

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
        .factory('AuthenticationService', function($http, $timeout, $q, $flash) {
            var service = {
                // Information about the current user
                currentUser: null,

                login: function(credentials) {
                    var login = $http.post('/login', credentials);
                    login.success(function(data) {
                        service.currentUser = data.user;
                        $flash.clear();
                    }).error(function(error) {
                        error = error.error ? error.error : error;
                        $flash.show(error.message || error);
                    });
                    return login;
                },

                logout: function() {
                    var logout = $http.get('/logout');
                    logout.success(function() {
                        service.currentUser = null;
                    });
                    return logout;
                },

                // Ask the backend to see if a user is already authenticated -
                // this may be from a previous session.
                requestCurrentUser: function() {
                    if (service.isAuthenticated()) {
                        return $q.when(service.currentUser);
                    } else {
                        return $http.get('/user').then(function(response) {
                            service.currentUser = response.data.user;
                            return service.currentUser;
                        });
                    }
                },

                // Is the current user authenticated?
                isAuthenticated: function() {
                    return !!service.currentUser;
                },

                // Is the current user admin?
                isAdmin: function() {
                    return service.isAuthenticated() && (service.currentUser.role === "ADMIN");
                }

            };
            return service;
        });
})();