angular.module('myBook.services.getFriends', [])
    .factory('getFriends', [
        '$http',
        '$q',
        '$cookies',
        'authentication',
        'BASE_URL',
        'USERNAME_COOKIE_KEY',
        function ($http, $q, $cookies, authentication, BASE_URL, USERNAME_COOKIE_KEY) {
            function getUserFriends(user) {
                var defer = $q.defer();

                if (user === $cookies.get(USERNAME_COOKIE_KEY)) {
                    user = 'me';
                } else {
                    user = 'users/' + user;
                }

                $http.get(BASE_URL + user + '/friends')
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

            function getAllFriends(username) {
                var defer = $q.defer();
                var requestService = '';

                if (username === $cookies.get(USERNAME_COOKIE_KEY)) {
                    requestService = 'me/friends';
                } else {
                    requestService = 'users/' + username + '/friends';
                }

                $http.get(BASE_URL + requestService)
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function getUserPreview(username) {
                var defer = $q.defer();

                $http.get(BASE_URL + 'users/' + username + '/preview')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function getUserFullData(username) {
                var defer = $q.defer();

                $http.get(BASE_URL + 'users/' + username)
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
                getUserPreview: getUserPreview,
                getUserFullData: getUserFullData
            }
        }
    ]);