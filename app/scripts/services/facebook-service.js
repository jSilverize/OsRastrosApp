'use strict';

angular.module('rastros')
.factory('facebook', function ($window, inject, config) {
    var factory = {};

    /**
     * Insert facebook SDK in document
     */
    factory.inject = function () {
        inject.js('facebook');
    };

    /**
     * Create facebook init variable in '$window' to async load
     */
    factory.load = function () {
        $window.fbAsyncInit = function () {
            $window.FB.init({
                appId  : config.FACEBOOK.APP_ID,
                status : true,
                cookie : true,
                xfbml  : true,
                version: 'v2.6'
            });

            $window.FB.AppEvents.logPageView();
        };

        factory.inject();
    };

    return factory;
});