'use strict';

angular.module('rastros')
.directive('sideNav', function (user, authentication, flow) {
	return {
		restrict   : 'E',
		replace    : true,
		templateUrl: 'app/templates/directives/side-nav-directive-template.html',
		link       : function (scope) {
			scope.user = user.data ? user.data : user.isLogged();

			scope.$on('user:changed', function (event, data) {
				scope.user = data;
			});

			scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page);
			};

			scope.logout = function () {
				authentication.logout();
			};

			$('.side-nav-toggle').sideNav({
				edge        : 'right', 	// Choose the horizontal origin
				closeOnClick: true 		// Closes side-nav on <a> clicks, useful for Angular/Meteor
			});
		}
	};
});
