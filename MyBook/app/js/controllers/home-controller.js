angular.module('myBook.controllers.homeController', ['myBook.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
        });
    }])
    .controller('homeController', [
        '$scope',
        '$location',
        '$window',
        '$cookies',
        'authentication',
        'usSpinnerService',
        'USERNAME_COOKIE_KEY',
        function homeController($scope, $location, $window, $cookies, authentication, usSpinnerService, USERNAME_COOKIE_KEY) {
            if (authentication.isAuthenticated()) {
                $location.path('/user-wall/' + $cookies.get(USERNAME_COOKIE_KEY));
            }
            
            $scope.login = function (user) {
                usSpinnerService.spin('loading-spinner');
                authentication.loginUser(user)
                    .then(function (response) {
                        usSpinnerService.stop('loading-spinner');
                        //Reloading the page to prevent bugs occurring from late data
                        $window.location.reload();
                    });
            };

            $scope.register = function (user) {
                usSpinnerService.spin('loading-spinner');
                authentication.registerUser(user)
                    .then(function (response) {
                        usSpinnerService.stop('loading-spinner');
                        //Reloading the page to prevent bugs occurring from late data
                        $window.location.reload();
                    });
            };
        }
    ]);