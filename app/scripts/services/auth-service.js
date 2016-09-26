'use strict';

angular.module('rastros')
.factory('auth', function ($rootScope, fireb) {
	var factory = {};
	var user    = fireb.auth().currentUser;

	factory.isLogged = function () {
		if (user) {
			return user;
		}
		
		return false;		
	};

	return factory;
});