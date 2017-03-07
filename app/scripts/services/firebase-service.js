'use strict';

angular.module('rastros')
.factory('fireb', function ($q) {
	var database = firebase.database();
	var factory  = {};

	factory.profiles = {
		create: function (uid, profile) {
			if (!uid || !profile) {
				return;
			}

	        database.ref('profiles/' + uid).set(profile);
        },
		update: function (uid, profile) {
			if (!uid || !profile) {
				return;
			}

	        database.ref('profiles/' + uid).update(profile);
        },
        getById: function (profileId) {
        	var deferred = $q.defer();

			if (!profileId) {
				deferred.reject();

				return deferred.promise;
			}

			database.ref('profiles/' + profileId)
				.on('value', function (snapshot) {
					deferred.resolve(snapshot.val());
				});

			return deferred.promise;
		},
	};

	factory.games = {
		create: function (match) {
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
        },
        imIn: function (match, profile) {
			if (!match || !profile) {
				return;
			}

			var path =
				'games/' +
				match.date.id +
				'-' +
				match.id +
				'/going/' +
				profile.uid;

			database.ref(path).set({
				confirmStamp: moment().format('YYYY-MM-DD[T]HH:mm:ss')
			});
        },
        imOut: function (match, profile) {
			if (!match || !profile) {
				return;
			}

			var path =
				'games/' +
				match.date.id +
				'-' +
				match.id +
				'/going';

			database.ref(path).child(profile.uid).remove();
        },
        get: function (dateId, gameId) {
        	var deferred = $q.defer();

        	if (!dateId || !gameId) {
        		deferred.reject();

        		return deferred.promise;
        	}

        	var path =
        		'games/' +
        		dateId +
        		'-' +
        		gameId;

        	database.ref(path)
				.on('value', function (snapshot) {
					var content = snapshot.val();

					if (!content) {
						deferred.reject();

						return;
					}

					deferred.resolve(content);
				});

			return deferred.promise;
        }
	};

	factory.teams = {
		create: function (team) {
			if (!team) {
				return;
			}

			var newTeam = {
				futligaID: team.id,
				name     : team.name,
				logo     : team.logo,
				logoOld  : team.logoOld,
			};

	        database.ref('teams/').push(newTeam);
        },
	};

	return factory;
});
