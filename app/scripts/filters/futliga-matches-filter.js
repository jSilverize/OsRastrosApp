'use strict';

angular.module('rastros')
.filter('futligaMatches', function ($filter, moment) {
    return function (html) {
        var futliga   = document.createElement('futliga');
        var calendar  = [];
        var matchInit = {
            opponent: null,
            date    : {},
            location: {
                stadium: null,
                street : null,
                number : null,
                zone   : null,
                city   : 'São Paulo',
                state  : 'SP',
            }
        };

        futliga.innerHTML = html;

        // find team logo or return a generic
        function findLogo (teamId) {
            if (!teamId) {
                return;
            }

            var images     = futliga.querySelectorAll('img');
            var imagesPath = 'https://futliga.com.br/imagens/distintivos/';

            for (var i in images) {
                var img = images[i];

                if (img.src && img.src.includes('/distintivos/' + teamId)) {
                    return imagesPath + teamId + '.gif';
                }
            }

            return imagesPath + '0.jpg';
        }

        //
        function fillCalendar () {
            var dateHeaders = futliga.querySelectorAll('div[style="float: left; margin: 10px 5px 10px 5px; width: 540px;"]');

            for (var i in dateHeaders) {
                var header = dateHeaders[i];

                if (header && !angular.isFunction(header) && !angular.isNumber(header)) {
                    var item  = header.nextElementSibling;

                    if (item.querySelector('.liga-link9')) {
                        var momentDate, hour, minute, day, week, weekDay, year, opponent, stadium;
                        var team  = {};
                        var match = angular.copy(matchInit);

                        day = item.querySelector('span[style="font-size: 30px;"]').innerText;

                        header = header.querySelector('div[style="float: right; width: 50%; text-align: right;"]').innerText;
                        header = header.replace('                            ', '');
                        header = header.replace('                        ', '');
                        header = $filter('removeBreakLines')(header);
                        header = header.replace('Semana ', '');

                        week = parseInt(header.slice(0, 2));
                        year = parseInt(header.slice(3, 7));

                        weekDay = item.querySelector('span[style="color: #000000; font-size: 10px; text-transform: uppercase;"]').textContent;

                        hour    = item.querySelectorAll('div[style="float: left; width: 300px; top: inherit; text-align: left;"]')[1];
                        stadium = hour.querySelector('.liga-link8').textContent;
                        stadium = stadium.replace('                                                ', '');
                        stadium = stadium.replace('                                            ', '');
                        stadium = $filter('removeBreakLines')(stadium);

                        hour = hour.innerHTML;
                        hour = $filter('stringRemoveAfter')(hour, '&nbsp;-&nbsp;');
                        hour = hour.replace('                                            ', '');
                        hour = $filter('removeBreakLines')(hour);

                        minute = hour.slice(3, 5);
                        hour   = hour.slice(0, 2);

                        momentDate = moment().year(year).week(week + 2);
                        momentDate.day($filter('weekDay')(weekDay));
                        momentDate.hour(hour);
                        momentDate.minute(minute);
                        momentDate.second(0);

                        match.date.time        = hour + ':' + minute;
                        match.date.day         = day;
                        match.date.weekDay     = weekDay;
                        match.date.moment      = momentDate;
                        match.date.formatted   = momentDate.format('dddd, DD [de] MMMM [de] YYYY');
                        match.location.stadium = stadium;

                        // Team title and ID
                        opponent = item.querySelector('.liga-link9');

                        team.title = opponent.innerText;
                        team.title = $filter('removeBreakLines')(team.title);
                        team.title = team.title.replace('                                                ', '');
                        team.title = team.title.replace('                                            ', '');

                        team.id = opponent.attributes.href.textContent;
                        team.id = team.id.replace(')', '');
                        team.id = parseInt(team.id.replace('javascript:DetalharEquipe(', ''));

                        team.logo = findLogo(team.id);

                        match.opponent = team;

                        calendar.push(match);
                    }
                }
            }
        }

        fillCalendar(futliga, calendar);

        return calendar;
    };
});
