'use strict';

angular.module('myBook', [
    'ngRoute',
    'ngCookies',
    'angularSpinner',
    'rt.popup',
    'naif.base64',
    'myBook.controllers.homeController',
    'myBook.controllers.mainController',
    'myBook.controllers.allFriendsController',
    'myBook.controllers.userWallController',
    'myBook.controllers.editProfileController',
    'myBook.controllers.changePasswordController',
    'myBook.services.userWall',
    'myBook.services.getFriends',
    'myBook.services.search',
    'myBook.services.identity',
    'myBook.services.authentication',
    'myBook.services.likes',
    'myBook.services.editProfile',
    'myBook.services.changePassword',
    'myBook.directives.headerMenuDirective',
    'myBook.directives.footerDirective',
    'myBook.directives.userPreviewDirective',
])
    .config([
        '$routeProvider',
        '$httpProvider',
        'usSpinnerConfigProvider',
        function ($routeProvider, $httpProvider, usSpinnerConfigProvider) {
            $routeProvider.otherwise({ redirectTo: '/' });

            $httpProvider.interceptors.push(['$q', 'toastr', function ($q, toastr) {
                toastr.options = {
                    "positionClass": "toast-top-center",
                    "timeOut": "2500",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }

                return {
                    'responseError': function (rejection) {
                        if (rejection.data && rejection.data['error_description']) {
                            toastr.error(rejection.data['error_description']);
                        } else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']) {
                            var errors = rejection.data.modelState[''];
                            if (errors.length > 0) {
                                toastr.error(errors[0]);
                            }
                        }

                        return $q.reject(rejection);
                    }
                }
            }]);

            usSpinnerConfigProvider.setDefaults({ color: '#FFF' });
        }])
    .run([
        'authentication',
        function (authentication) {
            authentication.refreshHeader();
        }
    ])
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/')
    .constant('USERNAME_COOKIE_KEY', 'Username_Cookie_Key');