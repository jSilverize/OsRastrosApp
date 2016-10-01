'use strict';

angular.module('rastros', [
    'ngRoute',
    'ngAnimate',
    'duScroll',
]);

angular.module('rastros')
.config(function ($locationProvider, $routeProvider, momentProvider) {

    momentProvider.locale('pt-br');

    // Routes
    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home-template.html',
            controller : 'HomeController',
        })
        .when('/404', {
            templateUrl: 'app/templates/404-template.html',
            controller : '404Controller',
        })
        .when('/login', {
            templateUrl: 'app/templates/auth-template.html',
            controller : 'AuthController',
            authPage   : true,
        })
        .when('/perfil', {
            templateUrl  : 'app/templates/profile-template.html',
            controller   : 'ProfileController',
            authenticated: true,
        })
        .otherwise({
            redirectTo: '/404'
        });
});
