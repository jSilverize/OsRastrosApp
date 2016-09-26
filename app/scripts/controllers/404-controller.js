'use strict';

angular.module('rastros')
.controller('404Controller', function ($scope, flow) {
	
    $scope.goBack = function () {
        flow.goBack();
    };

});
