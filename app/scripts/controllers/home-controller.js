'use strict';

angular.module('rastros')
.controller('HomeController', function ($rootScope, $scope,
	loader, flow, urls, futliga, fireb) {

	$scope.nextMatches = null;
	$scope.count       = {};
	$scope.detailsUrl  = urls.FUTLIGA.INDEX + urls.FUTLIGA.AGENDA_PATH;

	$scope.matches = function () {
		var loadMsg = 'Calendário da Futliga';

		loader.start(loadMsg);

		futliga.nextMatches()
			.then(function (response) {
				$scope.nextMatches = response;

				$scope.saveGames($scope.nextMatches);
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

	$scope.updateCounts = function (match, snapshot) {
		var number    = snapshot.numChildren();
		var profiles  = snapshot.val();

		match.imGoing       = false;
		match.goingNumber   = number || 0;
		match.goingProfiles = [];

		angular.forEach(profiles, function (value, key) {
			firebase.database().ref('profiles/' + key)
	    		.once('value').then(function (userSnapshot) {
	    			var people = userSnapshot.val();

	    			if (people) {
	    				var profile = {
		    				uid     : people.uid,
		    				name    : people.name,
		    				photoURL: people.photoURL ? people.photoURL : '/assets/images/icons/icon-60x60.png',
		    			};

		    			match.goingProfiles.push(profile);
	    			}

	    			$scope.$apply();
	    		});

    		var user = $rootScope.user;

	    	if (user) {
	    		if (key === user.uid) {
	    			match.imGoing = true;
	    		}
	    	}
		});
	};

	$scope.goingCount = function (match) {
		var path = 'games/' + match.date.id + '-' + match.id + '/going';

		firebase.database().ref(path)
			.on('value', function (snapshot) {
				$scope.updateCounts(match, snapshot);
			});
	};

	$scope.imGoing = function (match) {
		var user = $rootScope.user;

		if (!user) {
			flow.goTo('/entrar');

			return;
		}

		match.imGoing = true;

		fireb.games.imIn(match, user);
	};

	$scope.imNotGoing = function (match) {
		var user = $rootScope.user;

		if (!user) {
			flow.goTo('/entrar');

			return;
		}

		match.imGoing = false;

		fireb.games.imOut(match, user);
	};

	$scope.saveGames = function (games) {
		var user = $rootScope.user;

		if (!games || !user) {
			return;
		}

		for (var i = 0; i < games.length; i++) {
			var path = 'games/' + games[i].date.id + '-' + games[i].id;

			$scope.verifyMatch(path, games[i]);
		}
	};

	$scope.verifyMatch = function (path, match) {
		firebase.database().ref(path)
    		.once('value').then(function (gameSnapshot) {
    			if (gameSnapshot.val()) {
    				return;
    			}

    			fireb.games.create(match);
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
