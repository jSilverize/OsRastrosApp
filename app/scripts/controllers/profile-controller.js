'use strict';

angular.module('rastros')
.controller('ProfileController', function ($scope, user, authentication) {

	// Variables
	$scope.profile = user.data;
	$scope.linked  = {
		facebook: false,
		twitter : false,
		google  : false,
	};

	$scope._verifyLinks = function () {
		if (!$scope.profile) {
			return;
		}

		var providers = $scope.profile.providerData;

		angular.forEach(providers, function (provider) {
			switch (provider.providerId) {
				case 'facebook.com':
					$scope.linked.facebook = true;
					break;

				case 'twitter.com':
					$scope.linked.twitter = true;
					break;

				case 'google.com':
					$scope.linked.google = true;
					break;

				default:
					return false;
			}
		});
	};

	$scope.facebookLink = function () {
		authentication.facebookLink();
	};

	$scope.$on('user:changed', function (event, data) {
		$scope.profile = data;

		$scope._verifyLinks();
	});

	$scope.$on('$viewContentLoaded', function () {

	});
});
