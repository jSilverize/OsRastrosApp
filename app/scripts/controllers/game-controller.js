'use strict';

angular.module('rastros')
.controller('GameController', function ($rootScope, $scope, gameResolved, moment) {
	$scope.game = {};
	angular.extend($scope.game, gameResolved);

	$scope.game.date.moment = moment(gameResolved.date.timestamp);

	$scope.game.teams.home.score = {
		first : {
			goals : [],
			faults: [],
		},
		second:{
			goals : [],
			faults: [],
		},
	};

	$scope.game.teams.visitor.score =
		angular.copy($scope.game.teams.home.score);

	$scope.addGoal = function (team, frame) {
		if (!team || !frame) {
			console.info('Gol não-adicionado');

			return;
		}

		$scope.game.teams[team].score[frame].goals.push({
			time  : '\'15',
			player: {
				name  : 'Udimbas',
				number: '02'
			}
		});
	};

	$scope.removeGoal = function (team, frame, index) {
		if (!team || !frame || index === null) {
			console.info('Gol não-removido');

			return;
		}

		$scope.game.teams[team].score[frame].goals.splice(index, 1);
	};
});
