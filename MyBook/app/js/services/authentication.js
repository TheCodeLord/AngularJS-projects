angular.module('myBook.services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        '$location',
        'identity',
        'BASE_URL',
        '$cookies',
        'usSpinnerService',
        'USERNAME_COOKIE_KEY',
        function authentication($http, $q, $location, identity, BASE_URL, $cookies, usSpinnerService, USERNAME_COOKIE_KEY) {
            var AUTHENTICATION_COOKIE_KEY = 'Authentication_Cookie_Key';

            function preserveUserData(data) {
                var accessToken = data.access_token;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                $cookies.put(USERNAME_COOKIE_KEY, data.userName);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            }

            function isAuthenticated() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }

            function refreshHeader() {
                if (isAuthenticated()) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                    identity.requestUserProfile();
                }
            }

            function registerUser(user) {
                var defer = $q.defer();

                $http.post(BASE_URL + 'users/Register', user)
                    .then(function (response) {
                        preserveUserData(response.data);
                        
                        identity.requestUserProfile()
                            .then(function () {
                                defer.resolve(response.data);
                            });
                    }, function (err) {
                        //Stoping the spinner on ERR and left the handling to the global handler in the app.js
                        usSpinnerService.stop('loading-spinner');
                    });

                return defer.promise;
            }

            function loginUser(user) {
                var defer = $q.defer();

                $http.post(BASE_URL + 'users/Login', user)
                    .then(function (response) {
                        preserveUserData(response.data);
                        
                        identity.requestUserProfile()
                            .then(function () {
                                defer.resolve(response.data);
                            });
                    }, function (err) {
                        //Stoping the spinner on ERR and left the handling to the global handler in the app.js
                        usSpinnerService.stop('loading-spinner');
                    });

                return defer.promise;
            }

            function logoutUser(user) {
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                $cookies.remove(USERNAME_COOKIE_KEY);
                $http.defaults.headers.common.Authorization = undefined;
                identity.removeUserProfile();
                $location.path('/');
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser,
                isAuthenticated: isAuthenticated,
                refreshHeader: refreshHeader
            }
        }]);