'use strict';

angular.module('rastros')
.factory('fireb', function ($q) {
	var database = firebase.database();
	var factory  = {};

	factory.create = function (uid, user) {
		if (!uid || !user) {
			return;
		}

        database.ref('profiles/' + uid).set(user);
	};

	factory.createMatch = function (match) {
		if (!match) {
			return;
		}

		var newMatch = {
			date : match.date,
			teams: match.teams
		};

		delete newMatch.date.moment;

		var path =
			'games/' +
			match.date.id +
			'-' +
			match.id;

        database.ref(path).set(newMatch);
	};

	factory.getById = function (userId) {
		if (!userId) {
			return;
		}

		var deferred = $q.defer();

		database.ref('profiles/' + userId)
			.on('value', function (snapshot) {
				deferred.resolve(snapshot.val());
			});

		return deferred.promise;
	};

	return factory;
});
