'use strict';

angular.module('rastros')
.constant('urls', {
	CORS   : 'https://cors-anywhere.herokuapp.com/',
	FUTLIGA: {
		INDEX       : 'https://futliga.com.br/',
		IMAGES_PATH : 'imagens/distintivos/',
		AGENDA_PATH : 'Agenda/',
		NEXT_MATCHES: 'futliga/associado/equipes/associado-equipes-obter-agenda.asp?hidEquipe=8985&hidPagina=1',
	},
});
