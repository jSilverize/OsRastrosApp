'use strict';

angular.module('rastros')
.controller('HomeController', function ($rootScope, $scope,
	loader, flow, urls, futliga) {

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
					'Houve um problema com "' +
					loadMsg +
					'":<br />' +
					error.name
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

					match.goingNumber   = number;
					match.goingProfiles = [];

					angular.forEach(profiles, function (value, key) {
						firebase.database().ref('users/' + key)
				    		.once('value').then(function (userSnapshot) {
				    			var user = userSnapshot.val();

				    			if (!user) {
				    				return;
				    			}

				    			var profile = {
				    				name    : user.name,
				    				photoURL: user.photoURL,
				    			};

				    			match.goingProfiles.push(profile);

				    			$scope.$apply();
				    		});
					});
				}
			});
	};

	$scope.imGoing = function (match) {
		var user = $rootScope.user;

		if (!user) {
			flow.goTo('/entrar');

			return;
		}

		var path = 'going/' + match.date.id + '/' + user.uid;

		firebase.database().ref(path).set({
			confirmStamp: moment().format('YYYY-MM-DD[T]HH:mm:ss')
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
