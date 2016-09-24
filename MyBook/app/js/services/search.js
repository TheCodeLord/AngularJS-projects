angular.module('myBook.services.search', [])
    .factory('search', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function searchByUsername(searchExpression) {
                var defer = $q.defer();

                $http.get(BASE_URL + 'users/search?searchTerm=' + searchExpression)
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            return {
                searchByUsername: searchByUsername
            }
        }
    ]);