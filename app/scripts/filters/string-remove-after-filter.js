'use strict';

angular.module('rastros')
.filter('stringRemoveAfter', function () {
    return function (string, stringCut) {
        if (!stringCut) {
            return;
        }

        stringCut = string.indexOf(stringCut);

        return string.substring(0, stringCut !== -1 ? stringCut : string.length);
    };
});
