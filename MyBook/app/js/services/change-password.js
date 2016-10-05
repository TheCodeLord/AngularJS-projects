angular.module('myBook.services.changePassword', [])
    .factory('changePassword', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            function changePassword(data) {
                var defer = $q.defer();

                $http.put(BASE_URL + 'me/changepassword', data)
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            return {
                changePassword: changePassword
            }
        }
    ]);