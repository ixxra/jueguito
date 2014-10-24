var app = angular.module('game', ['ngRoute', 'game.controllers']);

//function config ($locationProvider, $routeProvider) {
//	
//}


app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider.
    when('/play', {
        templateUrl: '/public/templates/game.tpl.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
    }).
    when('/about', {
        templateUrl: '/public/templates/about.tpl.html'
    }).
    when('/records', {
        templateUrl: '/public/templates/scoreboard.tpl.html',
            controller: 'RecordCtrl',
            controllerAs: 'record'
    }).
    when('/help/:topicId', {
        templateUrl: '/public/templates/help.tpl.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
    });
}]);



/*
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider
    .when('/question/:questionId', {
        templateUrl: '/public/templates/question.tpl.html',
        controller: 'QuestionCtrl'
    }).
    when('/about', {
        templateUrl: '/public/templates/about.tpl.html'
    });
}])
*/
