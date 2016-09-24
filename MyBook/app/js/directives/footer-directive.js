angular.module('myBook.directives.footerDirective', [])
    .directive('footerDirective', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'templates/footer.html'
            }
    }]);