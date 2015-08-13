'use strict';
angular
.module('appControllers', ['apiGetServices', 'codeNameService'])

//controller for the test button TODO: this will become the generate code button.
.controller('MainController', ['$scope', 'nextCodeName', 'codeNameInit', function($scope, nextCodeName, codeNameInit) {
  $scope.add = nextCodeName.codeNameGen;
  $scope.output = codeNameInit.codeNameCreate;
  $scope.saveName = codeNameInit.codeNameUpdate;
}])

//controller to populate the ngRepeat function. TODO: this needs refactoring to
//work without the use of a global variable.
// .controller('SecondController', ['$scope', function($scope) {
//   $scope.codeName = codeNameArray;
//   $scope.$watch(function() {
//     return codeNameArray;
//   }, function(newVal) {
//     $scope.codeName = newVal;
//     console.log(newVal);
//   });
// }])

//TODO: create controller to manage the initilization of data on application load.
.controller('initCtrl', ['$scope',
'pokemonService',
'codeNameInit',

 function($scope, pokemonService, codeNameInit) {
    // $scope.loadCache = pokemonService.pokeApiInit;
    $scope.codeName = codeNameInit.codeNameInit;
}]);
