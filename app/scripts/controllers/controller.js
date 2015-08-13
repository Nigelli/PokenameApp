'use strict';
angular
.module('appControllers', ['apiGetServices', 'codeNameService'])

//controller for the generate & save code button. As well as the output box control.
.controller('MainController', ['$scope', 'nextCodeName', 'codeNameInit', function($scope, nextCodeName, codeNameInit) {
  $scope.add = nextCodeName.codeNameGen;
  $scope.output = codeNameInit.codeNameCreate;
  $scope.saveName = codeNameInit.codeNameUpdate;
}])

//controller to populate the ngRepeat function that cycles through saved codenames. 
.controller('initCtrl', ['$scope',
'pokemonService',
'codeNameInit',

 function($scope, pokemonService, codeNameInit) {
    $scope.codeName = codeNameInit.codeNameInit;
}]);
