'use strict';

angular.module('rastros')
.controller('GameController', function ($rootScope, $scope, gameResolved, moment) {
	$scope.game = {};
	angular.extend($scope.game, gameResolved);

	$scope.game.date.moment = moment(gameResolved.date.timestamp);
});
