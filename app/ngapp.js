'use strict';

angular
//Main application module referenced in index.jade by ng-app='app' line 30.
.module('app', ['ui.router', 'appControllers', 'appDirectives', 'apiGetServices'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: '/views/home.html'

      });
    })

// This is the initilization stage.
// TODO: needs to be refactored to utilize a angularjs controller instead of
// global variables.
    .run(['$state', 'pokemonService', function ($state, pokemonService) {
    //   pokeapiCheckOrGet('http://pokeapi.co/api/v1/pokedex/1/')
    //   .then(function (pokemonArr) {
    //     saveCodeName(pokemonArr, 'pokemonNamesCache');
    //     var codeName = [];
    //     codeNameArray = retrieveCodeName(codeName, 'CodeNameList');
    //     console.log(codeNameArray);
        console.log('run has run');
        pokemonService.pokeApiInit();
        $state.transitionTo('home');
    //
    //   });
    }]);
