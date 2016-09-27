'use strict';

angular.module('rastros')
.factory('auth', function ($rootScope, $q, fireb, user, loader, flow) {
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

	factory.facebookLogin = function () {
		var loadMsg  = 'Autenticando com Facebook';
		var provider = new firebase.auth.FacebookAuthProvider();

		loader.start(loadMsg);

		var test = firebAuth.signInWithRedirect(provider);

		console.log(test);

		debugger;

		firebAuth.getRedirectResult()
			.then(function (result) {
					var _token = result.credential ? result.credential.accessToken : null;
					var _user  = result.user;

					console.log(_user);

					user.data  		  = _user.providerData[0];
					user.data.fbToken = _token;

					$rootScope.$broadcast('user:changed', user.data);

					loader.stop(loadMsg);
				}).catch(function (error) {
					var code       = error.code;
					var message    = error.message;					
					var email      = error.email; 		// The email of the user's account used.					
					var credential = error.credential; 	// The firebase.auth.AuthCredential type that was used.

					$rootScope.$broadcast('user:changed', null);

					loader.error(code + ': ' + message + '<br />(' + email + ')');
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