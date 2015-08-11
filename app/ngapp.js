'use strict';

angular
//Main application module referenced in index.jade by ng-app='app' line 30.
.module('app', ['ui.router', 'appControllers'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
        url: '/',
        templateUrl: '/views/home.html'
// TODO: an additional loading state is to be create with a fun animation once
// the app has an initilization phase.
      });
    })

// This is the initilization stage.
// TODO: needs to be refactored to utilize a angularjs controller instead of
// global variables.
    .run(['$state', function ($state) {
      pokeapiCheckOrGet('http://pokeapi.co/api/v1/pokedex/1/')
      .then(function (pokemonArr) {
        saveCodeName(pokemonArr, 'pokemonNamesCache');
        var codeName = [];
        codeNameArray = retrieveCodeName(codeName, 'CodeNameList');
        console.log(codeNameArray);
        $state.transitionTo('home');

      });
    }]);
