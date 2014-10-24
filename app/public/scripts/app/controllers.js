angular.module('game.controllers', ['game.services']);


var test_question = {
    number: 0,
      body: "Es la ciencia que se dedica al estudio y resolucion de estructuras cristalinas",
     hints: [
        {id: "a", text: "cristalografia"},
        {id: "b", text: "topologia"},
        {id: "c", text: "topografia"}
      ],
    answer: {
        id: "a",
        img: "/public/img/soluciones/solucion0.gif"
    }
};


function unmarshall(data){
    var img_name = data.answer.img;

    data.number = data.id + 1;
    data.answer.img = '/public/img/soluciones/' + img_name;

    return data; 
}

function check_solution(answer, State, $scope, $location, $timeout){
    return function(qId){
        $scope.solved = true;

        if (qId == answer.id){
            $scope.visual_hint = answer.img;
        } else {
            $scope.visual_hint = "/public/img/error.gif"
        }
        console.log('setting timeout');
        $timeout(function(){
          console.log('bang' + '/#/question/' + State.playlist[State.current]);

          $location.path('/question/' + State.playlist[State.current]);
          return false;   
        }, 2000);
    };
}

function load_question(Question, State, $scope, $routeParams, $location, $timeout, number){
    Question.query({questionId: $routeParams.questionId - 1})
      .$promise.then(
              function(data){
                  var question = unmarshall(data);
                  $scope.question = question;
                  $scope.check = check_solution(question.answer, State, $scope, $location, $timeout);     
                              
              },
              function(error){
                  console.log(error);
              });
}

function QuestionCtrl(Question, State, Playlist, $routeParams, $scope, $location, $timeout) {
    if (State.playlist.length == 0){
        Playlist(function(data){
            State.playlist = data;
            load_question(Question, State, $scope, $routeParams, $location, $timeout, State.current);
        });
    } else { 
        load_question(Question, State, $scope, $routeParams, $location, $timeout, State.current);
    }

    console.log(State.playlist[State.current]);
    State.current = State.current + 1;
    $scope.visual_hint = "/public/img/sugerencia.gif";
    $scope.solved = false;
}

angular.module('game.controllers')
.controller('QuestionCtrl', QuestionCtrl);

/*
function PostListCtrl (Post, $scope) {
	$scope.posts = Post.query();
}

function PostDetailCtrl ($routeParams, Post, Comment, User, $scope) {
	$scope.post = {};
	$scope.comments = {};
	$scope.user = {}
		//var self = $scope; // Para guardar la referencia
		Post.query({ id: $routeParams.postId })
		.$promise.then(
				//Success
				function (data) {
					$scope.post = data[0];
					$scope.user = User.query({ id: $scope.user.userId });
				},
				//Error
				function (error) {
					console.log(error);
				}
				);
		$scope.comments = Comment.query({ postId: $routeParams.postId });
	}

	function PostCreateCtrl (Post, $scope) {
		$scope.post = {};
		$scope.create = function() {
			Post.save($scope.post);
			$scope.post = {};
		};
	}

angular.module('game.controllers')
.controller('PostListCtrl', PostListCtrl)
.controller('PostCreateCtrl', PostCreateCtrl)
.controller('PostDetailCtrl', PostDetailCtrl);
*/
