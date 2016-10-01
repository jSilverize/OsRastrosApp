'use strict';

angular.module('rastros')
.constant('urls', {
	CORS   : 'https://cors-anywhere.herokuapp.com/',
	FUTLIGA: {
		INDEX       : 'https://futliga.com.br/',
		NEXT_MATCHES: 'futliga/associado/equipes/associado-equipes-obter-agenda.asp?codigo=8985',
	},
});
