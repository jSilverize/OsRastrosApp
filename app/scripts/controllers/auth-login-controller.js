'use strict';

angular.module('rastros')
.controller('LoginController', function ($scope, auth, user, fireb, flow) {
	$scope.form = {};

	$scope.login = function () {
		var form = $scope.form;

		if (!form.email || !form.password) {
			return;
		}

		auth.login(form.email, form.password);
	};

	$scope.goToRegister = function () {
		flow.goTo('/meu/cadastro');
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
