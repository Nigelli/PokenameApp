'use strict';
angular
.module('appControllers', ['appServices'])

//controller for the test button TODO: this will become the generate code button.
.controller('MainController', ['$scope', 'service1', function($scope, service1) {
      $scope.add = service1.pokeApiTest;

    }])

//controller to populate the ngRepeat function. TODO: this needs refactoring to
//work without the use of a global variable.
.controller('SecondController', ['$scope', function($scope) {
        $scope.codeName = codeNameArray;
        $scope.$watch(function() {
          return codeNameArray;
        }, function(newVal, oldVal) {
          $scope.codeName = newVal;
          console.log(newVal);
        });
      }]);
