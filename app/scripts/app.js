'use strict';

angular.module('rastros', [
    'ngRoute',
    'duScroll',
    'aphrodite'
]);

angular.module('rastros')
.config(function ($routeProvider, momentProvider) {

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
        .when('/entrar', {
            templateUrl: 'app/templates/auth-login-template.html',
            controller : 'AuthController',
            authPage   : true,
        })
        .when('/cadastrar', {
            templateUrl: 'app/templates/auth-register-template.html',
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
