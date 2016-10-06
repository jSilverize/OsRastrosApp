'use strict';

angular.module('rastros')
.directive('sideNav', function (user, authentication, flow, $mdSidenav) {
	return {
		restrict   : 'E',
		templateUrl: 'app/templates/directives/side-nav-directive-template.html',
		link       : function (scope) {
			scope.user = user.data ? user.data : user.isLogged();

			scope.$on('user:changed', function (event, data) {
				scope.user = data;
			});

			scope.toggleSidenav = function () {
				$mdSidenav('right').toggle();
			};

			scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page);
			};

			scope.logout = function () {
				authentication.logout();
			};
		}
	};
});
