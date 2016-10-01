'use strict';

angular.module('rastros')
.service('futliga', function ($http, $q, $filter, urls) {
    var futligaURL = urls.CORS + urls.FUTLIGA.INDEX + urls.FUTLIGA.NEXT_MATCHES;
    var factory    = {
        matches: [],
    };

    factory.get = function () {
        var deferred    = $q.defer();
        var calendarURL = futligaURL;

        $http.get(calendarURL)
            .then(function (response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                }
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    factory.nextMatches = function () {
        var deferred = $q.defer();

        factory.get()
            .then(function (response) {
                deferred.resolve(
                    $filter('futligaMatches')(response)
                );
            })
            .catch(function (error){
                deferred.reject(error);
            });

        return deferred.promise;
    };

    return factory;
});
