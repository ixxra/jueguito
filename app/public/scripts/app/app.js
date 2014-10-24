//var app = angular.module('game', ['ngRoute', 'game.controllers']);
var app = angular.module('game', ['ngRoute', 'game.controllers']);

//function config ($locationProvider, $routeProvider) {
//	
//}

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

