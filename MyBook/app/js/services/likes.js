angular.module('myBook.services.likes', [])
    .factory('likes', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function likePost(postId) {
                var defer = $q.defer();

                $http.post(BASE_URL + 'Posts/' + postId + '/likes')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            function unlikePost(postId) {
                var defer = $q.defer();

                $http.delete(BASE_URL + 'Posts/' + postId + '/likes')
                    .then(function (response) {
                        defer.resolve(response);
                    });

                return defer.promise;
            }

            return {
                likePost: likePost,
                unlikePost: unlikePost
            }
        } 
]);