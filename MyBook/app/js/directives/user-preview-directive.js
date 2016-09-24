angular.module('myBook.directives.userPreviewDirective', [])
    .directive('userPreviewDirective', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'templates/user-preview.html'
            }
        }
    ]);