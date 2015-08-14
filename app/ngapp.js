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

    .run(['$state', 'pokemonService', function ($state, pokemonService) {

        pokemonService.pokeApiInit();
        $state.transitionTo('home');

    }]);
