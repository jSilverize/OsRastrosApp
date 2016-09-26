'use strict';

angular.module('rastros')
.controller('HomeController', function ($scope, loader, flow, futliga) {

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
