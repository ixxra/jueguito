angular.module('game.services', ['ngResource'])
.constant('BaseUrl', '/api/v0.1')
.factory('Question', function ($http, BaseUrl){
    return {
        get: function(qId){
            return $http.get(BaseUrl + '/question/' + qId);
        }
    };
    /*
    return $resource(BaseUrl + '/question/:questionId',{}, {
        query: {
            method: 'GET',
            params: {questionId: ''},
            //questionId: '@_id',
            isArray: false
        }
    });*/
});

angular.module('game.services').factory('State', function(){
    var questions = [];
    for (i = 0; i < 20; i++){
        questions.push(i);
    }
    shuffle(questions);

    var totalQuestions = 10;
    questions = questions.slice(totalQuestions);
    var current = 0;

    function nextQuestion(){
        ++current;
    }

    function currentQuestionId(){
        return questions[current];
    }

    function currentQuestion(){
        return current + 1;
    }

    function hasMoreQuestions(){
        return current < totalQuestions - 1;
    }

    function reset(){
        questions = [];
        for (i = 0; i < 20; i++){
            questions.push(i);
        }
        shuffle(questions);
        questions = questions.slice(totalQuestions);
        current = 0;
    }

    return {
        currentQuestion: currentQuestion,
        currentQuestionId: currentQuestionId,
        nextQuestion: nextQuestion,
        hasMoreQuestions: hasMoreQuestions,
        reset: reset
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
