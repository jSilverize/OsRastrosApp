'use strict';

angular.module('rastros')
.directive('navbar', function ($window, flow, user, $mdSidenav) {
	return {
		restrict   : 'E',
		scope      : true,
		templateUrl: 'app/templates/directives/navbar-directive-template.html',
		link       : function (scope) {
			scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page);
			};
		},
		controller : function ($scope) {
			$scope.user = user.data ? user.data : user.isLogged();

			$scope.$on('user:changed', function (event, data) {
				$scope.user = data;
			});

			$scope.toggleSidenav = function () {
				$mdSidenav('right').toggle();
			};
		},
	};
});
