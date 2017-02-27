'use strict';

angular.module('rastros')
.factory('authentication', function ($rootScope, $document, $window,
	fireb, user, loader, flow) {
	var auth    = firebase.auth();
	var factory = {};

	factory.register = function (email, password) {
		var loadMsg = 'Criando conta';

		loader.start(loadMsg);

		auth.createUserWithEmailAndPassword(email, password)
			.then(function () {
				flow.goBack();
				loader.stop(loadMsg);
			})
			.catch(function(error) {
				loader.stop(loadMsg);
				loader.error(
					'<div class="aph loader__content__error__title">Ué...</div>' +
					'Alguma coisa deu errado tentando fazer seu cadastro, saca só:<br />' +
					error.message
				);

				$document.find('body')[0].click();
			});
	};

	factory.login = function (email, password) {
		var loadMsg = 'Autenticando';

		loader.start(loadMsg);

		auth.signInWithEmailAndPassword(email, password)
			.then(function () {
				flow.goBack();
				loader.stop(loadMsg);
			})
			.catch(function(error) {
				loader.stop(loadMsg);
				loader.error(
					'<div class="aph loader__content__error__title">Ih, carai!</div>' +
					'Alguma coisa deu errado tentando fazer seu login, saca só:<br />' +
					error.message
				);

				$document.find('body')[0].click();
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
				loader.error(
					'<div class="aph loader__content__error__title">Óh azidéia...</div>' +
					'Parece que não é pra você sair daqui, hein?!<br />Hehehe<br />' +
					'Se liga no erro que deu, tentando fazer logout:<br />' +
					error.message
				);

				$document.find('body')[0].click();
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

		loader.start(loadMsg);

		auth.signInWithPopup(provider)
			.then(function () {
				loader.stop(loadMsg);
			})
			.catch(function () {
				loader.stop(loadMsg);

				loader.error(
					'<div class="aph loader__content__error__title">Ish...</div>' +
					'Não deu bom tentando fazer o login com o ' +
					title +
					'<br />Tenta de novo aí, vai que funfa...'
				);

				$document.find('body')[0].click();
			});
	};

	factory._writeUserData = function (user) {
		if (!user) {
			return;
		}

		var newUser = {
			name         : user.displayName,
			email        : user.email,
			emailVerified: user.emailVerified,
			photoURL     : user.photoURL,
			permission   : 'default'
		};

		fireb.create(user.uid, newUser);
	};

	auth.onAuthStateChanged(function (_user) {
		$document.find('body')[0].click();

		if (_user) {
			user.data = _user;
			$rootScope.$broadcast('user:changed', user.data);

			factory._writeUserData(_user);
			return;
		}

		user.data = null;
		$rootScope.$broadcast('user:changed', null);
	});

	return factory;
});