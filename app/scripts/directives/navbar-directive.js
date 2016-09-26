'use strict';

angular.module('rastros')
.directive('navbar', function ($location) {
	return {
		restrict   : 'E',
		scope      : true,
		templateUrl: 'app/templates/directives/navbar-directive-template.html',
		controller : function ($scope, flow) {
			$scope.goTo = function (page) {
				var _page = page || '/';
				flow.goTo(_page, $location.path());
			};
		},
	};
});
