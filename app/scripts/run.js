'use strict';

angular.module('rastros')
.run(function ($rootScope, routeChange, flow) {
    /**
     * When some route faile to resolve
     */
    $rootScope.$on('$routeChangeError', routeChange.error);

    /**
     * On route change start
     */
    $rootScope.$on('$routeChangeStart', routeChange.start);

    /**
     * On location change success
     */
    $rootScope.$on('$routeChangeSuccess', routeChange.success);

    /**
     * Set the lastest path
     */
    if (!flow.ls.getItem('lastPath')) {
    	flow.ls.setItem('lastPath', '/');
    }
});
