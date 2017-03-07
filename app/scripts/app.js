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
            templateUrl  : 'app/templates/home-template.html',
            controller   : 'HomeController',
            authPage     : false,
            authenticated: false,
        })
        .when('/404', {
            templateUrl  : 'app/templates/404-template.html',
            controller   : '404Controller',
            authPage     : false,
            authenticated: false,
        })
        .when('/entrar', {
            templateUrl  : 'app/templates/auth-login-template.html',
            controller   : 'AuthController',
            authPage     : true,
            authenticated: false,
        })
        .when('/cadastrar', {
            templateUrl  : 'app/templates/auth-register-template.html',
            controller   : 'AuthController',
            authPage     : true,
            authenticated: false,
        })
        .when('/perfil', {
            templateUrl  : 'app/templates/profile-template.html',
            controller   : 'ProfileController',
            authPage     : false,
            authenticated: true,
        })
        .when('/jogos/:dateId/:gameId', {
            templateUrl  : 'app/templates/game-template.html',
            controller   : 'GameController',
            authPage     : false,
            authenticated: true,
            resolve      : {
                gameResolved: function ($route, fireb) {
                    var dateId = $route.current.params.dateId;
                    var gameId = $route.current.params.gameId;

                    if (!dateId || !gameId) {
                        console.log('tá errado');
                    }

                    return fireb.games.get(dateId, gameId);
                }
            }
        })
        .otherwise({
            redirectTo: '/404'
        });
});
