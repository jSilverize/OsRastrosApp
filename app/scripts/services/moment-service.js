'use strict';

angular.module('rastros')
.provider('moment', function () {
    var _locale;

    return {
        /**
         * Set the moment language
         */
        locale: function (locale) {
            _locale = locale;
        },

        /**
         * Configure moment and return it
         */
        $get: function ($window) {
            $window.moment.locale(_locale);

            return $window.moment;
        },
    };
});
