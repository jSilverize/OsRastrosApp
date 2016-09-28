'use strict';

angular.module('rastros')
.directive('navbar', function ($window, flow, user, authentication) {
	return {
		restrict   : 'E',
		scope      : true,
		templateUrl: 'app/templates/directives/navbar-directive-template.html',
		link       : function (scope) {
			scope.screen = $window.innerWidth;
			scope.opened = true;

			scope.logout = function () {
				authentication.logout();
			};

			scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page);
			};

			scope.toggle = function () {
				scope.opened = !scope.opened;
			};

			scope.handle = function () {
				if (scope.screen < 768) {
					scope.opened = false;
					return;
				}
				
				scope.opened = true;
			};

			scope.resized = function () {
				if (scope.screen !== $window.innerWidth) {
					scope.screen = $window.innerWidth;

					scope.handle();
				}
			};

			scope.handle();

			angular.element($window)
				.bind('resize', scope.resized);
		},
		controller : function ($scope) {
			$scope.user = user.data ? user.data : user.isLogged();

			$scope.$on('user:changed', function (event, data) {
				$scope.user = data;
			});
		},
	};
});
