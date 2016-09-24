angular.module('myBook.services.userWall', [])
    .factory('userWall', [
        '$http',
        '$q',
        'usSpinnerService',
        'BASE_URL',
        function ($http, $q, usSpinnerService, BASE_URL) {
            function getPosts(username, pageSize, startPage) {
                pageSize = pageSize || 10;
                startPage = startPage || '';
                var defer = $q.defer();

                //Query options StartPostId=[X] & PageSize=[X] 
                //PageSize is REQUIRED (range 0 to 10 incusive)
                $http.get(BASE_URL + 'users/' + username + '/wall' + '?StartPostId=' + startPage + '&PageSize=' + pageSize)
                    .then(function (response) {
                        defer.resolve(response.data);
                    }, function (err) {
                        //Stoping the spinner on ERR and left the handling to the global handler in the app.js
                        usSpinnerService.stop('loading-spinner');
                    });

                return defer.promise;
            }

            return {
                getPosts: getPosts
            }
        }
    ]);