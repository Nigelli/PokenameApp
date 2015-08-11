'use strict';

angular
.module('appDirectives', [])
// This is a custom directive rotuing several buttons to different functions.
// TODO: this directive and its attached functions is to be replaced by ng-click,
// controllers and services.
.directive('changeOnClick', function() {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope, $element, $attr) {
        return $element.on('click', function() {
          var button = $element[0].id;
          switch (button) {
            case 'retrieveCode':
              console.log('getCode button pressed');
              pokeapiCheckOrGet('http://pokeapi.co/api/v1/pokedex/1/');
              break;
            case 'addCode':
              console.log('Add Button Pressed');

              break;
            case 'saveCode':
              console.log('saveCode button pressed');
              break;
            case 'getCode':
              var letterPrompt = prompt('enter a letter');
              adjectiveGet('http://www.whimsicalwordimal.com/api/adj', letterPrompt)
              .then(function (adjectiveArr) {
                var adjective = JSON.parse(adjectiveArr);
                pokemonFinder(letterPrompt).then(function (pokemonList) {
                    var codeName = adjective.adjective + ' ' + pokemonList;
                    console.log(codeName);
                    updateCodeName(codeName, 'CodeNameList', codeName);
                    });
              });
              break;
          }
        });
      }
    };
  })

//  This function defines the template for the ng-repeat responsible for
// displaying the pokémon codenames.
.directive('codeName', function() {
      return {
        restrict: 'E',
        scope: {
          info: '=',
        },
        templateUrl: 'views/codeName.html'
      };
    });
