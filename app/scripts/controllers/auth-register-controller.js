'use strict';

angular.module('rastros')
.controller('RegisterController', function ($scope, fireb) {
	$scope.form = {};

	$scope.register = function () {
		fireb.create($scope.form);
	};

	$scope.getUser = function () {
		fireb.getById('-KScdmK-XuudZVo3Cofn')
			.then(function (response) {
				$scope.user = response;
				console.log(response);
			});
	};

	$scope.$on('$viewContentLoaded', function () {
		$scope.getUser();
	});
});
