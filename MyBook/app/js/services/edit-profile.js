angular.module('myBook.services.editProfile', [])
    .factory('editProfile', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            function getUserData() {
                var defer = $q.defer();

                $http.get(BASE_URL + 'me')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function editProfile(data) {
                var defer = $q.defer();

                $http.put(BASE_URL + 'me', data)
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            return {
                getUserData: getUserData,
                editProfile: editProfile
            }
        }
    ]);