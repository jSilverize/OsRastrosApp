'use strict';

angular.module('rastros')
.factory('fireb', function () {
	var database = firebase.database();
	var factory  = {};

	factory.create = function (uid, user) {
		if (!uid || !user) {
			return;
		}

        database.ref('users/' + uid).set(user);
	};

	factory.getById = function (userId) {
		if (!userId) {
			return;
		}

		database.ref('/users/' + userId)
			.on('value', function (snapshot) {
				return snapshot.val();
			});
	};

	return factory;
});
