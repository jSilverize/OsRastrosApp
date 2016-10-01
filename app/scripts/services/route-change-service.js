'use strict';

angular.module('rastros')
.factory('routeChange', function ($rootScope, $document, $timeout, $location,
    user, flow, scroll, loader) {

    var factory   = {};
    var loaderMsg = 'Carregando';

    /**
     * On route change start
     */
    factory.start = function (event, next) {
        loader.start(loaderMsg);

        // var isUserLogged = user.isLogged();

        // // route need auth user send to login
        // if (next.$$route.authenticated && !isUserLogged) {
        //     flow.goTo('/login', $location.path());
        // }

        // // route is an auth page and user is logged, send to profile
        // if (next.$$route.authPage && isUserLogged) {
        //     flow.goTo('/perfil', $location.path());
        // }
    };

    /**
     * On route change success
     */
    factory.success = function () {
        scroll.toTop();

        $timeout(function () {
            loader.stop(loaderMsg);
        }, 800);
    };


    /**
     * On route change error
     */
    factory.error = function (error) {
        loader.stop(loaderMsg);

        $timeout(function () {
            loader.error('<strong>VISH</strong>!<br />Isso aqui deu errado:<br />"' + error.name + '"');
        }, 1000);

        flow.goBack();
    };

    return factory;
});
