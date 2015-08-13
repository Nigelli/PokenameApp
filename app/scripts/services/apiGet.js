'use strict';

angular
.module('apiGetServices', ['localStorageService'])
//Config function initilizes the required parameters for the angular storage service.
.service('pokemonService', ['apiGet', 'localStorage', function(apiGet, localStorage) {

    //Load the saved pokedex data from the clients local storage
  function _pokedexApiLoad() {
    var data = localStorage.localStorageLoad('pokedex');
    return data;
  }
    //Return and Save the PokeName Pokedex object from 'http://pokeapi.co/'
    // to the clients local storage
  function _pokedexApiSave() {
    console.log('_pokeApi is running');
    apiGet.apiCall('http://pokeapi.co/api/v1/pokedex/1/')
    .then(function(data){
      localStorage.localStorageSave('pokedex', data);
    });
    console.log('_pokeApi is complete');
  }


  function _pokedexApiLoadOrGet() {
    //TODO create a function to load the cached pokedex or complete a GET.
  }

  return {
    pokeApiLoad: _pokedexApiLoad,
    pokeApiNew: _pokedexApiSave,
    pokeApiInit: _pokedexApiLoadOrGet,
    pokemon: []
  };
}])

.service('adjectiveService',
[
  'apiGet',
  'nextCodeNameLetter',
  function(apiGet, nextCodeNameLetter) {

  //Return a random adjective from 'http://www.whimsicalwordimal.com'
  function _adjApi() {
    var letter = nextCodeNameLetter.letterNext();
    var url = 'http://www.whimsicalwordimal.com/api/adj/' + letter;
    console.log(url);
    console.log('_adjApi has run');

    return apiGet.apiCall(url);
  }

  return {
    adjApi: _adjApi
  };
}])

// Generic API promise will return a GET from the url provided.
.service('apiGet', function ($http, $q) {

  function _apiTest() {
      console.log('_apiTest has run');
  }

  function _apiGet(url) {
    console.log('_apiGet is running');
    var deffered = $q.defer();
    $http.get(url).success(function(data) {
      deffered.resolve(data);
      console.log('_apiGet complete');
    }).error(function() {
      deffered.reject();
      console.log('_apiGet failed');
    });
    return deffered.promise;
  }

  return {
    apiCall: _apiGet,
    apiTest: _apiTest
  };
});
