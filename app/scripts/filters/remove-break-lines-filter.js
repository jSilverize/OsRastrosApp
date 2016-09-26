'use strict';

angular.module('rastros')
.filter('removeBreakLines', function () {
    return function removeBreakLines (string) {
        var result = string;

        while (result.match(/\r?\n|\r/)) {
            result = result.replace(/\r?\n|\r/, '');
        }

        return result;
    };
});
