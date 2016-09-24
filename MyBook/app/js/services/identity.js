angular.module('myBook.services.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            var defer = $q.defer();
            var currentUser = undefined;

            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return defer.promise;
                    }
                },
                requestUserProfile: function () {
                    var userProfileDeferred = $q.defer();

                    $http.get(BASE_URL + 'me')
                        .then(function (response) {
                            currentUser = response.data;
                            defer.resolve(currentUser);
                            userProfileDeferred.resolve();
                        });

                    return userProfileDeferred.promise;
                },
                removeUserProfile: function () {
                    currentUser = undefined;
                }
            };
        }
    ]);