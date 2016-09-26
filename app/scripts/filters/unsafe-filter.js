'use strict';

angular.module('rastros')
.filter('unsafe', function ($sce) {
    return function (content) {
        return $sce.trustAsHtml(content);
    };
});
