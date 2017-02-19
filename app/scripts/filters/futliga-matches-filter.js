'use strict';

angular.module('rastros')
.filter('futligaMatches', function ($filter) {
    return function (html) {
        var futliga   = document.createElement('futliga');
        var calendar  = [];
        var matchInit = {
            teams: {},
            date : {},
        };

        futliga.innerHTML = html;

        function splitAgenda () {
            var matches = futliga.querySelectorAll('.agenda-pagina-equipe');

            for (var i = 0; i < matches.length; i++) {
                var match = angular.copy(matchInit);
                var date  = matches[i].querySelector('h5');
                var teams = matches[i].querySelectorAll('.jogos-times-nome h4 a');

                // Define Date
                match.date = $filter('detectDate')(date.innerText);

                // Define Teams
                match.teams.home    = $filter('detectTeam')(teams[0]);
                match.teams.visitor = $filter('detectTeam')(teams[1]);

                calendar.push(match);
            }
        }

        function resetImages () {
            var images = futliga.querySelectorAll('img');

            for (var i = 0; i < images.length; i++) {
                images[i].src = '';
            }
        }

        resetImages();
        splitAgenda();

        return calendar;
    };
});
