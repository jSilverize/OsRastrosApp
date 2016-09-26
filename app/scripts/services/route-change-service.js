'use strict';

angular.module('rastros')
.factory('routeChange', function ($rootScope, $document, $timeout,
    flow, scroll, loader) {

    var factory     = {};
    var bodyContent = $document.find('content');
    var loaderMsg   = 'Trampando...';

    /**
     * On route change start
     */
    factory.start = function () {
        loader.start(loaderMsg);

        bodyContent.addClass('loading');
    };

    /**
     * On route change success
     */
    factory.success = function () {
        scroll.toTop();

        $timeout(function () {
            bodyContent.removeClass('loading');
            loader.stop(loaderMsg);
        }, 800);
    };


    /**
     * On route change error
     */
    factory.error = function (error) {
        $timeout(function () {
            loader.error('<strong>VISH</strong>!<br />Isso aqui deu errado:<br />"' + error.name + '"');
        }, 1000);

        flow.goBack();
    };

    return factory;
});
