angular.module('myBook.controllers.allFriendsController', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/all-friends/:username', {
                templateUrl: 'templates/all-friends.html',
                controller: 'allFriendsController'
            });
        }
    ])
    .controller('allFriendsController', [
        '$scope',
        '$routeParams',
        'usSpinnerService',
        'getFriends',
        function ($scope, $routeParams, usSpinnerService, getFriends) {
            //Start loading spinner
            usSpinnerService.spin('loading-spinner');

            getFriends.getAllFriends($routeParams.username)
                .then(function (response) {
                    //Stop loading spinner
                    usSpinnerService.stop('loading-spinner');

                    $scope.allFriends = response.data;
                });
        }
    ]);