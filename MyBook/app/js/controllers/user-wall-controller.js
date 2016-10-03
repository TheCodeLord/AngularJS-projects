angular.module('myBook.controllers.userWallController', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/user-wall/:username', {
                templateUrl: 'templates/user-wall.html',
                controller: 'userWallController'
            });
        }])
    .controller('userWallController', [
        '$scope',
        '$location',
        '$cookies',
        '$routeParams',
        'usSpinnerService',
        'authentication',
        'userWall',
        'getFriends',
        'identity',
        'likes',
        'USERNAME_COOKIE_KEY',
        function ($scope, $location, $cookies, $routeParams, usSpinnerService, authentication, userWall, getFriends, identity, likes, USERNAME_COOKIE_KEY) {
            if (!authentication.isAuthenticated()) {
                $location.path('/');
            }

            //Start loading spinner
            usSpinnerService.spin('loading-spinner');

            var getWallPosts = function () {
                userWall.getPosts($routeParams.username, 10)
                .then(function (response) {
                    //Stop loading spinner
                    usSpinnerService.stop('loading-spinner');

                    if (response.length === 0) {
                        $scope.latestFeed = [{
                            postContent: 'You do not have any posts on your wall yet...',
                        }];
                    } else {
                        $scope.latestFeed = response;
                        $scope.hasPosts = true;
                    }
                });
            }

            //Geting latest posts by username taken from the URL ($routeParams.username)
            getWallPosts();

            // Returns an Array with all friends that the wall owner has
            $scope.getAllFriends = function (isFriendOrOwnWall) {
                //If the user is not friend or if it is not own wall he cannot see the wall owner friends
                if (isFriendOrOwnWall) {
                    getFriends.getUserFriends($routeParams.username)
                    .then(function (response) {
                        var friendsArr = response;
                        $scope.totalFriendsCount = response.length;

                        if (friendsArr.length === 0) {
                            friendsArr = [];
                        } else if (friendsArr.length > 6) {
                            $scope.totalFriendsCount = friendsArr.length;
                            friendsArr = friendsArr.splice(friendsArr.length - 6);
                        }

                        for (var i = 0; i < friendsArr.length; i++) {
                            friendsArr[i].profileImageData = friendsArr[i].profileImageData || 'http://www.hdi-slc.com/wp-content/uploads/2012/07/blank-profile.jpg';
                        }

                        $scope.friends = friendsArr;
                    });
                } else {
                    return null;
                }
            };

            getFriends.getUserFullData($routeParams.username)
                .then(function (response) {
                    var data = response.data;
                    $scope.wallOwner = data;
                    $scope.isOwnWall = false;

                    if (data.username !== $cookies.get(USERNAME_COOKIE_KEY)) {
                        if (data.isFriend) {
                            $scope.friendStatus = 'friend';
                        } else if (data.hasPendingRequest) {
                            $scope.friendStatus = 'pending';
                        } else {
                            $scope.friendStatus = 'invite';
                        }
                    } else {
                        $scope.friendStatus = null;
                        $scope.isOwnWall = true;
                    }
                });

            $scope.likePost = function (item) {
                likes.likePost(item.id)
                    .then(function (response) {
                        item.liked = true;
                        item.likesCount++;
                    });
            };

            $scope.unlikePost = function (item) {
                likes.unlikePost(item.id)
                    .then(function (response) {
                        item.liked = false;
                        item.likesCount--;
                    });
            };

            $scope.showUserPreview = function (username) {
                getFriends.getUserPreview(username)
                    .then(function (response) {
                        var data = response.data;
                        var status = null;

                        $scope.userPreviewData = data;
                        if (data.username !== $cookies.get(USERNAME_COOKIE_KEY)) {
                            if (data.isFriend) {
                                status = 'friend';
                            } else if (data.hasPendingRequest) {
                                status = 'pending';
                            } else {
                                status = 'invite';
                            }
                        }

                        //Depending on the status the button is disabled or enabled 
                        //and has different styles and content
                        $scope.userPreviewData.status = status;
                    });
            };

            $scope.hideUserPreview = function () {
                $scope.userPreviewData = null;
            };

            $scope.addPost = function (commentContent) {
                var wallOwnerUsername = $routeParams.username;

                //Add new post and refresh the posts after the post is added to display the new post
                userWall.addPost(wallOwnerUsername, commentContent)
                    .then(function () {
                        getWallPosts();
                    });
            };

            $scope.addComment = function (id, commentContent) {
                //Add new comment and refresh the posts after the comment is added to display the new comment
                userWall.addComment(id, commentContent)
                    .then(function () {
                        getWallPosts();
                    });
            };

            $scope.sendFriendRequest = function (username) {
                getFriends.sendFriendRequest(username)
                    .then(function (response) {
                        //Changing the button text to "pending" and disabling the button
                        $scope.wallOwner.hasPendingRequest = true;
                        $scope.friendStatus = 'pending';
                    });
            }
        }
    ]);