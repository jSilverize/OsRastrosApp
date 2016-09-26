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
        .when('/meu/login', {
            templateUrl: 'app/templates/auth-login-template.html',
            controller : 'LoginController',
            authPage   : true,
        })
        .when('/meu/cadastro', {
            templateUrl: 'app/templates/auth-register-template.html',
            controller : 'RegisterController',
            authPage   : true,
        })
        .when('/meu/perfil', {
            templateUrl  : 'app/templates/garage/garage-template.html',
            controller   : 'ProfileController',
            authenticated: true,
        })
        .otherwise({
            redirectTo: '/404'
        });
});
