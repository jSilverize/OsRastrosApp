'use strict';

angular.module('rastros')
.factory('auth', function ($rootScope, fireb, user, loader, flow) {
	var firebAuth = firebase.auth();
	var factory   = {};

	factory.login = function (email, password) {
		var loadMsg = 'Autenticando';
		loader.start(loadMsg);

		firebAuth.signInWithEmailAndPassword(email, password)
			.then(function () {
				flow.goBack();
				loader.stop(loadMsg);
			})
			.catch(function(error) {
				loader.error(error.message);
			});
	};

	factory.logout = function () {		
		var loadMsg = 'Saindo';
		loader.start(loadMsg);

		firebAuth.signOut()
			.then(function () {
				loader.stop(loadMsg);
			}, function(error) {
				loader.error(error.message);
			});
	};

	firebAuth.onAuthStateChanged(function (_user) {
		if (_user) {
			user.data = _user.providerData[0];

			$rootScope.$broadcast('user:changed', user.data);
			return;
		}

		user.data = null;
		$rootScope.$broadcast('user:changed', null);
	});

	return factory;
});