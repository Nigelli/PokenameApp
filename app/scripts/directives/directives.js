'use strict';

angular
.module('appDirectives', [])

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
