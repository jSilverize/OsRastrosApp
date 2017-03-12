'use strict';

angular.module('rastros')
.controller('AddGoalModalController', function ($scope, params) {

	$scope.saveGoal = function () {
		$scope.game.score[params.frame][params.team].goals.push({
			minute: $scope.goal.minute,
			player: {
				name  : '',
				number: $scope.goal.player,
			},
		});

		$scope.addGoalModal.close();
	};

});
