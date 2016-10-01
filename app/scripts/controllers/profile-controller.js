'use strict';

angular.module('rastros')
.controller('ProfileController', function ($scope, authentication, user, flow) {
	$scope.facebookLink = function () {
		authentication.facebookLink();
	};

	$scope.resolveUser = function (data) {
		if (!data) {
			flow.goTo('/login');
			return;
		}

		$scope.user = data;
	};

	$scope.$on('user:changed', function (event, data) {
		$scope.resolveUser(data);
	});

	$scope.$on('$viewContentLoaded', function () {
		$scope.resolveUser(user.isLogged());
	});
});
