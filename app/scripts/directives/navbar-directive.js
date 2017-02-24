'use strict';

angular.module('rastros')
.directive('navbar', function ($rootScope, $window, flow, user, authentication) {
	return {
		restrict   : 'E',
		scope      : true,
		templateUrl: 'app/templates/directives/navbar-directive-template.html',
		link       : function (scope, element) {
			element.addClass('aph navbar navbar--fixed-top');

			scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page);
			};
		},
		controller : function ($scope) {
			$rootScope.user = user.data ? user.data : user.isLogged();

			$scope.$on('user:changed', function (event, data) {
				$rootScope.user = data;
			});

			$scope.logout = function () {
				authentication.logout();
			};
		},
	};
});
