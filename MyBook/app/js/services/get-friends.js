angular.module('myBook.services.getFriends', [])
    .factory('getFriends', [
        '$http',
        '$q',
        'authentication',
        'BASE_URL',
        function ($http, $q, authentication, BASE_URL) {
            function getUserFriends() {
                var defer = $q.defer();

                $http.get(BASE_URL + 'me/friends')
                    .then(function (response) {
                        defer.resolve(response.data)
                    });

                return defer.promise;
            }

            function getFriendRequests() {
                var defer = $q.defer();

                $http.get(BASE_URL + 'me/requests')
                    .then(function (response) {
                        defer.resolve(response.data);
                    });

                return defer.promise;
            }

            function getFriendRequestsCount() {
                var defer = $q.defer();

                $http.get(BASE_URL + 'me/requests')
                    .then(function (response) {
                        defer.resolve(response.data.length)
                    });

                return defer.promise;
            }

            function processFriendRequest(id, status) {
                var defer = $q.defer();

                $http.put(BASE_URL + 'me/requests/' + id + '?status=' + status)
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function getAllFriends() {
                var defer = $q.defer();

                $http.get(BASE_URL + 'me/friends')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function getUserPreview(name) {
                var defer = $q.defer();

                $http.get(BASE_URL + 'users/' + name + '/preview')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            return {
                getUserFriends: getUserFriends,
                getFriendRequests: getFriendRequests,
                getFriendRequestsCount: getFriendRequestsCount,
                processFriendRequest: processFriendRequest,
                getAllFriends: getAllFriends,
                getUserPreview: getUserPreview
            }
        }
    ]);