angular.module('myBook.controllers.editProfileController', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit-profile', {
            templateUrl: 'templates/edit-profile.html',
            controller: 'editProfileController'
        });
    }])
    .controller('editProfileController', [
        '$scope',
        '$window',
        'toastr',
        'editProfile',
        function ($scope, $window, toastr, editProfile) {
            editProfile.getUserData()
                .then(function (response) {
                    $scope.userData = response.data;
                });

            $scope.editProfile = function (data) {
                var newData = {
                    name: data.name,
                    email: data.email,
                    profileImageData: data.profileImageData,
                    coverImageData: data.coverImageData,
                    gender: data.gender
                }

                editProfile.editProfile(newData)
                    .then(function () {
                        $window.location.reload();
                    });
            };

            $scope.submitProfileImg = function () {
                var profileImgMaxSize = 128000;

                if ($scope.profileImgModel.filesize > profileImgMaxSize) {
                    toastr.error('ERROR: The Image is bigger than 128kb!');
                    return;
                } else {
                    var imgData = 'data:' + $scope.profileImgModel.filetype + ';base64,' + $scope.profileImgModel.base64;
                    $scope.userData.profileImageData = imgData;
                }
            };

            $scope.submitCoverImg = function () {
                var coverImgMaxSize = 1024000;

                if ($scope.coverImgModel.filesize > coverImgMaxSize) {
                    toastr.error('ERROR: The Image is bigger than 1024kb!');
                    return;
                } else {
                    var imgData = 'data:' + $scope.coverImgModel.filetype + ';base64,' + $scope.coverImgModel.base64;
                    $scope.userData.coverImageData = imgData;
                }
            };
        }
    ]);