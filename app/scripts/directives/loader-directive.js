'use strict';

angular.module('rastros')
.directive('loader', function (loader) {
    return {
        restrict   : 'E',
        templateUrl: 'app/templates/directives/loader-directive-template.html',
        scope      : {},
        link       : function (scope) {
            scope.activities = loader.activities;
            scope.errors     = loader.errors;

            scope.clearError = function (error) {
                loader.clearError(error);
            };
        },
    };
});
