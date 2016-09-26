'use strict';

angular.module('rastros')
.factory('fireb', function ($q, loader) {
	var database = firebase.database();
	var factory  = {};

	factory.create = function (user) {
		if (!user) {
			return;
		}
		var loadMsg = 'Cadastrando';

		loader.start(loadMsg);

        var newUserKey = database.ref().child('users').push().key;

        database.ref('users/' + newUserKey).set(user)
			.then(function () {
	    		loader.stop(loadMsg);
	    	})
	    	.catch(function (error) {
	    		loader.error(error);
	    	});
	};

	factory.getById = function (userId) {
		if (!userId) {
			return;
		}

		var deferred = $q.defer();

		database.ref('/users/' + userId).once('value')
			.then(function (snapshot) {
				deferred.resolve(snapshot.val());
			})
			.catch(function (error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	return factory;
});
