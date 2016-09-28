'use strict';

angular.module('rastros')
.factory('user', function ($rootScope, $timeout, fireb, loader, flow) {
	var firebAuth = firebase.auth();
	
	var factory = {
		data: null
	};

	factory.isLogged = function () {
		var user = factory.data;

		if (user) {			
			$rootScope.$broadcast('user:logged', user);
			return user;
		}
		
		return null;
	};

	factory.create = function (email, password) {
		var loadMsg = 'Cadastrando';
		loader.start(loadMsg);

		firebAuth.createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
				loader.error(error.message);
			});

		$timeout(function() {
			flow.goBack();
			loader.stop(loadMsg);
		}, 1000);
	};

	return factory;
});