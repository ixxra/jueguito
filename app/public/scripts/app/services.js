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


var Help = function(){
     var topics = {
        trivia: {
            id: 'trivia', 
            name: 'Trivia', 
            url: '#/help/trivia', 
            instructions: 'Pon a prueba tus conocimientos con esta divertida trivia. Debes responder la mayor cantidad de preguntas posibles. Una vez que contestes una pregunta, espera un instante hasta que la siguiente aparezca.'
        },
        patrick: {
            id: 'patrick',
            name: 'Encuentra el cristal',
            url: '#/help/patrick',
            instructions: 'Ayuda a patricio a encontrar la mayor cantidad de cristales posibles. Una vez que encuentres uno en la imagen, haz click sobre él para pasar a la siguiente etapa.'
        }
    };

    var topic = function(id){
          return topics[id]; 
    };

    var get_topics = function(){
        var t = [];
        for (prop in topics){
            if (topics.hasOwnProperty(prop)){
                t.push(topics[prop]);
            }
        }
        return t;
    };

    return {topic: topic, get_topics: get_topics};
};

var Patrick = function () {
    var total = 4;
    var current = 0;
    
    function hasMoreImages(){
        return current < total - 1;
    }

    function next(){
        ++current;
        if (current > total){
            current = total;
        }
    }

    function problem(){
        var _current = current + 1;
        return {
            number: _current,
            image: {url: '/public/img/patrick/cristal'+_current+'.jpg'}
        };
    }

    function reset(){
        current = 0;
    }

    return {
        problem: problem,
        hasMoreImages: hasMoreImages,
        next: next,
        reset: reset
    };
};

angular.module('game.services').
constant('BaseUrl', '/api/v0.1').
factory('Patrick', Patrick).
factory('Record', function($resource, BaseUrl){
   return $resource(BaseUrl + '/game/records'); 
}).
factory('Help', Help);

 

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
