angular.module('game.services', ['ngResource'])
.constant('BaseUrl', '/api/v0.1')
.factory('Question', Question);

function Question($resource, BaseUrl){
    return $resource(BaseUrl + '/question/:questionId',{}, {
        query: {
            method: 'GET',
            params: {questionId: ''},
            //questionId: '@_id',
            isArray: false
        }
    });
}




angular.module('game.services').factory('State', function ($http){
    return {
        playlist: [],
        current: 0
    }
}).factory('Playlist', function($http){
    return function (callback){
        $http.get('/api/v0.1/game/new')
           .success(function (data, status, headers, config){
               callback(data);
           }).
           error(function(data, status, headers, config){
               console.log(error);
           });
    }
});

/*
angular.module('game.services', ['ngResource'])
.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
.factory('Post', Post)
.factory('Comment', Comment)
.factory('User', User);

function Post ($resource, BaseUrl) {
	return $resource(BaseUrl + '/posts/:postId', {
		postId: '@_id'
	});
}

function Comment ($resource, BaseUrl) {
	return $resource(BaseUrl + '/comments/:commentId', { 
		commentId: '@_id' 
	});
}

function User ($resource, BaseUrl) {
	return $resource(BaseUrl + '/users/:userId', { 
		userId: '@_id' 
	});
}
*/
