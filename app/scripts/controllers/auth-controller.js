'use strict';

angular.module('rastros')
.controller('AuthController', function ($scope, authentication, user, fireb, flow) {
	$scope.form = {};

	$scope.login = function () {
		var form = $scope.form;

		if (!form.email || !form.password) {
			return;
		}

		authentication.login(form.email, form.password);
	};

	$scope.facebook = function () {
		authentication.facebook();
	};

	$scope.$on('user:changed', function (event, data) {
		$scope.user = data;

		if ($scope.user) {
			flow.goBack();
		}
	});

	$scope.$on('$viewContentLoaded', function () {
		$scope.user = user.isLogged();

		if ($scope.user) {
			flow.goBack();
		}
	});
});
