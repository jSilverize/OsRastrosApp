'use strict';

angular.module('rastros')
.filter('detectTeam', function ($filter, urls) {
	return function (teamHTMLanchor) {
		var newTeam = {};

        newTeam.id      = parseInt(
                teamHTMLanchor.href
                    .slice(-5)
                    .replace('p', '')
                    .replace('e', '')
                    .replace('/', '')
            );

        newTeam.title   =
            $filter('removeBreakLines')(teamHTMLanchor.innerText)
                .replace('                            ', '')
                .replace('                        ', '');

        newTeam.logoOld =
            urls.FUTLIGA.INDEX +
            urls.FUTLIGA.IMAGES_PATH +
            newTeam.id +
            '.gif';

        newTeam.logo    =
            urls.FUTLIGA.INDEX +
            urls.FUTLIGA.IMAGES_PATH +
            newTeam.id +
            '-v01.gif';

        return newTeam;
	};
});