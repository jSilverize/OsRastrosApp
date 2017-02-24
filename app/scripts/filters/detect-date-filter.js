'use strict';

angular.module('rastros')
.filter('detectDate', function ($filter, moment) {
	return function (dateString) {
		var string  =
            $filter('removeBreakLines')(dateString)
                .replace('     ', '')
                .replace('                     ', '')
                .replace('                ', '');

        var date = string.slice(-19, -9);
        var time = string.slice(-5);

        date = {
            day   : date.slice(0, 2),
            month : date.slice(3, 5),
            year  : date.slice(6, 10),
            hour  : time.slice(0, 2),
            minute: time.slice(3, 5),
        };

        date.id     = date.year + date.month + date.day;
        date.moment =
            moment(
                date.year +
                '-' +
                date.month +
                '-' +
                date.day +
                'T' +
                time +
                ':00'
            );

        return date;
	};
});