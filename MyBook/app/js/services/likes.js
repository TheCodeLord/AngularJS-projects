angular.module('myBook.services.likes', [])
    .factory('likes', [
        '$http',
        '$q',
        'toastr',
        'BASE_URL',
        function ($http, $q, toastr, BASE_URL) {
            function likePost(postId) {
                var defer = $q.defer();

                $http.post(BASE_URL + 'Posts/' + postId + '/likes')
                    .then(function (response) {
                        defer.resolve(response);
                    }, function (err) {
                        toastr.error(err.data.message);
                    });

                return defer.promise;
            }

            function unlikePost(postId) {
                var defer = $q.defer();

                $http.delete(BASE_URL + 'Posts/' + postId + '/likes')
                    .then(function (response) {
                        defer.resolve(response);
                    }, function (err) {
                        toastr.error(err.data.message);
                    });

                return defer.promise;
            }

            return {
                likePost: likePost,
                unlikePost: unlikePost
            }
        } 
]);