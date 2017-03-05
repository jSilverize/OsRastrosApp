'use strict';

angular.module('rastros')
.factory('flow', function ($filter, $location, $route, $window) {
    /**
     * Control the application flow
     */
    var factory = {
        ls      : $window.localStorage,
        lastPath: null
    };

    /**
     * Go to page
     *
     * @param {string} page   - Page to go
     * @param {string} origin - Origin of navigation
     */
    factory.goTo = function (page, origin) {
        var _page     = page || '/';
        var blackList = ['/404', '/entrar', '/cadastrar', '/perfil'];

        origin = origin ? origin : $location.path();

        if (origin && blackList.indexOf(origin) === -1) {
            factory.ls.setItem('lastPath', origin);
        }

        $location.path(_page);
    };

    /**
     * Go back
     */
    factory.goBack = function () {
        var lastPath = factory.ls.getItem('lastPath');

        $location.path(lastPath);
    };

    /**

    /**
     * Reload current flow
     */
    factory.reload = function () {
        $route.reload();
    };

    return factory;
});
