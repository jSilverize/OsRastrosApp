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
        getById: function (profileId) {
			if (!profileId) {
				return;
			}

			var deferred = $q.defer();

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
