'use strict';

angular.module('rastros')
.factory('authentication', function ($rootScope, $q, fireb, user, loader, flow) {
	var auth = firebase.auth();
	var factory   = {};

	factory.login = function (email, password) {
		var loadMsg    = 'Autenticando';
		var credential = new firebase.auth.EmailAuthProvider.credential(email, password);

		loader.start(loadMsg);

		auth.signInWithEmailAndPassword(email, password)
			.then(function () {
				flow.goBack();
				loader.stop(loadMsg);
			})
			.catch(function(error) {
				loader.stop(loadMsg);
				loader.error(error.message);
			});
	};

	factory.logout = function () {
		var loadMsg = 'Saindo';
		loader.start(loadMsg);

		auth.signOut()
			.then(function () {
				loader.stop(loadMsg);
			}, function(error) {
				loader.stop(loadMsg);
				loader.error(error.message);
			});
	};

	factory.facebook = function () {
		var provider = new firebase.auth.FacebookAuthProvider();

		factory.provider(provider, 'Facebook');
	};

	factory.twitter = function () {
		var provider = new firebase.auth.TwitterAuthProvider();

		factory.provider(provider, 'Twitter');
	};

	factory.provider = function (provider, title) {
		var loadMsg  = 'Autenticando com ' + title;

		provider.addScope('email');

		loader.start(loadMsg);

		auth.signInWithPopup(provider)
			.then(function (result) {
				user.data = result.user;

				$rootScope.$broadcast('user:changed', user.data);

				loader.stop(loadMsg);
			}).catch(function (error) {
				var code       = error.code;
				var message    = error.message;
				var email      = error.email; 		// The email of the user's account used.
				var credential = error.credential; 	// The firebase.auth.AuthCredential type that was used.

				$rootScope.$broadcast('user:changed', null);

				loader.stop(loadMsg);
				loader.error(''+ code + ': ' + message + '<br />(' + email + ')');
			});
	};

	auth.onAuthStateChanged(function (_user) {
		if (_user) {
			user.data = _user;
			$rootScope.$broadcast('user:changed', user.data);
			return;
		}

		user.data = null;
		$rootScope.$broadcast('user:changed', null);
	});

	return factory;
});