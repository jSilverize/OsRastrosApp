'use strict';

angular.module('rastros')
.controller('AuthController', function ($rootScope, $scope, $window, $document,
	authentication, user, facebook, loader, flow) {
	$scope.form = {};

	$scope.facebook = function () {
		authentication.facebook();
	};

	$scope.twitter = function () {
		authentication.twitter();
	};

	$scope.login = function () {
		var form = $scope.form;

		if (!form.email || !form.password) {
			return;
		}

		authentication.login(form.email, form.password);
	};

	$scope.register = function () {
		var form = $scope.form;

		if (!form.email || !form.password) {
			return;
		}

		authentication.register(form.email, form.password);
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
