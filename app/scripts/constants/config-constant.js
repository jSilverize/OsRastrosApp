'use strict';

angular.module('rastros')
.constant('config', {
	FACEBOOK: {
		APP_ID: '100871850338155',
		SCOPE : 'email,user_friends,user_birthday,user_location',
		SDK   : '//connect.facebook.net/pt_BR/sdk.js',
		ERROR : {
			CODE: 'fb-not-loaded',
			MSG : 'Não foi possível carregar o serviço de autenticação do Facebook. Vamos tentar reestabelecer a conexão. Tente novamente em alguns segundos.',
		},
	}
});
