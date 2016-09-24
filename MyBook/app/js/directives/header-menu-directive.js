angular.module('myBook.directives.headerMenuDirective', [])
    .directive('headerMenuDirective', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'templates/header-menu.html'
            }
        }
    ]);