'use strict';

angular.module('rastros')
.factory('user', function ($rootScope, $timeout, loader, flow) {
	var auth = firebase.auth();

	var factory = {
		data: null,
		test: {},
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

		auth.createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
				loader.error(error.message);
			});

		$timeout(function() {
			flow.goBack();
			loader.stop(loadMsg);
		}, 1000);
	};

	$rootScope.$on('user:changed', function (event, data) {
		factory.data = data;
	});

	return factory;
});
