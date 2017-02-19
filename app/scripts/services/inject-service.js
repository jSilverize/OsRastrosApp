'use strict';

angular.module('rastros')
.factory('inject', function ($window, config) {
    var factory = {};

    /**
     * Insert JS in document
     *
     * @param {string} name   - JS external resource name, example: 'facebook', 'accountkit'
     * @param {string} target - element selector (OPTIONAL)
     * @param {string} src    - external library path (OPTIONAL)
     */
    factory.js = function (name, target, src) {
        var newJS;
        var tag      = 'script';
        var id       = name + '-jssdk';
        var doc      = $window.document;
        var head     = doc.getElementsByTagName(target ? target : 'head')[0];
        var loadedJS = doc.getElementById(id);

        if (loadedJS) {
            if (loadedJS.readyState === 'loaded' ||
                loadedJS.readyState === 'complete') {
                return;
            }

            loadedJS.remove();
        }

        newJS    = doc.createElement(tag);
        newJS.id = id;

        switch (name) {
            case 'facebook':
                newJS.src = config.FACEBOOK.SDK;
                break;

            case 'accountkit':
                newJS.src = config.ACCOUNT_KIT.SDK;
                break;

            default:
                newJS.src = src ? src : 'none';
        }

        head.appendChild(newJS);
    };

    return factory;

});