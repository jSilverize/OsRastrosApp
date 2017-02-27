'use strict';

angular.module('rastros')
.factory('routeChange', function ($rootScope, $document, $timeout, $location,
    flow, scroll, loader) {

    var factory   = {};
    var loaderMsg = 'Carregando...';

    /**
     * On route change start
     */
    factory.start = function () {
        loader.start(loaderMsg);
    };

    /**
     * On route change success
     */
    factory.success = function (event, current) {
        scroll.toTop();

        firebase.auth().onAuthStateChanged(function (_user) {
            // route need auth user send to login
            if (current.$$route.authenticated && !_user) {
                flow.goTo('/entrar', $location.path());
            }

            // route is an auth page and user is logged, send to profile
            if (current.$$route.authPage && _user) {
                flow.goTo('/perfil', $location.path());
            }

            $timeout(function () {
                loader.stop(loaderMsg);
            }, 800);
        });
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
