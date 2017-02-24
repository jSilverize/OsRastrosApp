'use strict';

angular.module('rastros')
.controller('HomeController', function ($scope, loader, flow, urls, futliga) {

	$scope.nextMatches = null;
	$scope.count       = {};
	$scope.detailsUrl  = urls.FUTLIGA.INDEX + urls.FUTLIGA.AGENDA_PATH;

	$scope.matches = function () {
		var loadMsg = 'Calendário da Futliga';

		loader.start(loadMsg);

		futliga.nextMatches()
			.then(function (response) {
				$scope.nextMatches = response;
			})
			.catch(function (error) {
				loader.error(
					'Houve um problema com "' + loadMsg + '":<br />' + error.name
				);
			})
			.finally(function () {
				loader.stop(loadMsg);
			});
	};

	$scope.goingCount = function (match) {
		firebase.database().ref('going/' + match.date.id)
			.on('value', function (snapshot) {
				var number = snapshot.numChildren();

				if (number) {
					var profiles = snapshot.val();

					console.log(number);
					console.log(profiles);

					match.goingNumber   = number;
					match.goingProfiles = profiles;

					$scope.$digest();
				}
			});
	};

	$scope.imGoing = function (match) {
		console.log(match);
	};

    $scope.otherPage = function () {
        flow.goTo('/404');
    };

    /**
     * On view content load login user
     */
    $scope.$on('$viewContentLoaded', function () {
    	$scope.matches();
    });

});
