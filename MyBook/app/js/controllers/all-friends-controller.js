angular.module('myBook.controllers.allFriendsController', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/all-friends', {
                templateUrl: 'templates/all-friends.html',
                controller: 'allFriendsController'
            });
        }
    ])
    .controller('allFriendsController', [
        '$scope',
        'usSpinnerService',
        'getFriends',
        function ($scope, usSpinnerService, getFriends) {
            //Start loading spinner
            usSpinnerService.spin('loading-spinner');

            getFriends.getAllFriends()
                .then(function (response) {
                    //Stop loading spinner
                    usSpinnerService.stop('loading-spinner');

                    $scope.allFriends = response.data;
                });
        }
    ]);