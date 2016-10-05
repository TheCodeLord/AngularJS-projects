angular.module('myBook.controllers.changePasswordController', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/change-password', {
            templateUrl: 'templates/change-password.html',
            controller: 'changePasswordController'
        });
    }])
    .controller('changePasswordController', [
        '$scope',
        'changePassword',
        function ($scope, changePassword) {
            $scope.changePassword = function (data) {
                changePassword.changePassword(data);
            }
        }
    ]);