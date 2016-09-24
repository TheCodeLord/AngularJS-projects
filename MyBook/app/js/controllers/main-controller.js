angular.module('myBook.controllers.mainController', [])
    .controller('MainController', [
        '$scope',
        'identity',
        'authentication',
        'search',
        'getFriends',
        function ($scope, identity, authentication, search, getFriends) {
            if (authentication.isAuthenticated()) {
                identity.getCurrentUser()
                .then(function (user) {
                    $scope.currentUser = user;
                });

                $scope.isAuthenticated = true;
            }

            $scope.logout = function() {
                authentication.logoutUser();
                $scope.isAuthenticated = false;
            }

            $scope.search = function (data) {
                if (data === '') {
                    return;
                }

                search.searchByUsername(data)
                    .then(function (response) {
                        $scope.searchResults = response.data;
                        //Function to hide the results from the search
                        $scope.hideResults = function () {
                            $scope.searchResults = undefined;
                        }
                    });
            }

            $scope.getFriendRequests = function () {
                getFriends.getFriendRequests()
                .then(function (data) {
                    $scope.friendRequests = data;
                    //Function to hide the friend requests
                    $scope.hideRequests = function () {
                        $scope.friendRequests = undefined;
                    }
                });
            }

            //Displaying the count of pending requests if user is authenticated
            if (authentication.isAuthenticated()) {
                getFriends.getFriendRequestsCount()
                    .then(function (data) {
                        if (data === 0) {
                            $scope.getFriendRequests = null;
                        } else {
                            $scope.getFriendRequestsCount = data;
                        }
                    });
            }

            $scope.acceptRequest = function (id) {
                var status = 'approved';

                getFriends.processFriendRequest(id, status)
                    .then(function (response) {
                        $scope.getFriendRequests();
                        getFriends.getFriendRequestsCount()
                            .then(function (data) {
                                $scope.getFriendRequestsCount = data;
                            });
                    });
            }

            $scope.rejectRequest = function (id) {
                var status = 'rejected';

                getFriends.processFriendRequest(id, status)
                    .then(function (response) {
                        $scope.getFriendRequests();
                        getFriends.getFriendRequestsCount()
                            .then(function (data) {
                                $scope.getFriendRequestsCount = data;
                            });
                    });
            }
        }
    ]);