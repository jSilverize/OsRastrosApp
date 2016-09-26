'use strict';

angular.module('rastros')
.filter('weekDay', function () {
    return function (weekDayBR) {
        var result;

        switch (weekDayBR) {
            case 'Segunda':
                result = 'Monday';
                break;

            case 'Terça':
                result = 'Tuesday';
                break;

            case 'Quarta':
                result = 'Wednesday';
                break;

            case 'Quinta':
                result = 'Thursday';
                break;

            case 'Sexta':
                result = 'Friday';
                break;

            case 'Sábado':
                result = 'Saturday';
                break;

            default:
                result = 'Monday';
        }

        return result;
    };
});
