'use strict';

angular.module('rastros')
.directive('errorSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if (attrs.src !== attrs.errorSrc) {
					attrs.$set('src', attrs.errorSrc);
				}
			});
		}
	};
});
