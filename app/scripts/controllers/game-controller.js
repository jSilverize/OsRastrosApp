'use strict';

angular.module('rastros')
.controller('GameController', function ($rootScope, $scope,
	gameResolved, ngDialog, moment) {

	$scope.game = {};
	angular.extend($scope.game, gameResolved);

	$scope.game.date.moment = moment(gameResolved.date.timestamp);

	$scope.game.score = {
		first : {
			home: {
				goals : [],
				faults: [],
			},
			visitor: {
				goals : [],
				faults: [],
			},
		},
		second: {
			home: {
				goals : [],
				faults: [],
			},
			visitor: {
				goals : [],
				faults: [],
			},
		},
	};

	$scope.addGoal = function (team, frame) {
		if (!team || !frame) {
			console.info('Gol não-adicionado');

			return;
		}

		$scope.addGoalModal =
			ngDialog.open({
				template  : 'templates/modals/add-goal-modal-template.html',
				controller: 'AddGoalModalController',
				scope     : $scope,
				resolve   : {
					params: function () {
						return {
							team : team,
							frame: frame,
						};
					}
				},
			});
	};

	$scope.removeGoal = function (team, frame, index) {
		if (!team || !frame || index === null) {
			console.info('Gol não-removido');

			return;
		}

		var club = $scope.game.teams[team];
		var goal = $scope.game.score[frame][team].goals[index];
		var mf   = frame === 'first' ? 'Primeiro' : 'Segundo';
		var ask  =
			'<h3 class="aph text-red">ANULAR GOL' +
			' da equipe <strong>' +
			club.title +
			'</strong>?</h3><br />' +
			mf +
			' Jogo<br /><br />' +
			'<i class="fa fa-fw fa-lg fa-futbol-o"></i> \'' +
			goal.minute +
			' #' +
			goal.player.number +
			'<br /><br />';

		alertify.confirm(ask, function (ok) {
			if (ok) {
				$scope.game.score[frame][team].goals.splice(index, 1);
			}
		});
	};

	$scope.itemOnLongPress = function () {
		console.log('Long press');
	};

	$scope.itemOnTouchEnd = function () {
		console.log('Touch end');
	};
});
