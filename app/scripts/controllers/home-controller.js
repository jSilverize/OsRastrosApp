'use strict';

angular.module('rastros')
.controller('HomeController', function ($scope, flow, futliga) {

	futliga.nextMatches()
		.then(function (response) {
			$scope.nextMatches = response;
		});

    $scope.otherPage = function () {
        flow.goTo('/404');
    };

});
