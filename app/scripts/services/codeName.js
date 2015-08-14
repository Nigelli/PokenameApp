'use strict';

angular
.module('codeNameService', ['localStorageService', 'apiGetServices'])
// Service to retrieve, store or update pokemon codenames in the local storage.
.service('codeNameInit', ['apiGet', 'localStorage', function(apiGet, localStorage) {

    // Load the current stored codeNameList

    var codeNames = 'CodeNameList';
    var codeName = 'CodeName';

    function _codeNameInit() {
      console.log('codeNames');
      var storageLoad = localStorage.localStorageLoad(codeNames);
      if (storageLoad !== null) {
        console.log(storageLoad);
        return storageLoad;
      }
      else {
        console.log('Your codenames have not yet been generated');
        _saveCodeNameList([]);
        return;
      }
    }
    function _saveCodeNameList(arr) {
      localStorage.localStorageSave(codeNames, arr);
      console.log('saved');
      return;
    }
    function _removeCodeNameList(index) {
      console.log(index);
      var currentCodes = localStorage.localStorageLoad(codeNames);
      currentCodes.splice(index, 1);
      localStorage.localStorageSave(codeNames, currentCodes);
      console.log('removed');
      return;
    }
    function _resetCodeNameList() {
      localStorage.localStorageDelete(codeNames);
      _saveCodeNameList([]);
      return;
    }
    function _currentCodeName() {
      var storageLoad = localStorage.localStorageLoad(codeName);
      if (storageLoad !== null) {
        console.log(storageLoad);
        return storageLoad;
      }
      else {
        console.log('Your codenames have not yet been generated');
        return 'Waiting for you.';
      }
    }
    function _updateCodeNameList() {
      if (localStorage.localStorageLoad(codeName) === null) {

      } else {
        var storage = localStorage.localStorageLoad(codeNames);
        var item = localStorage.localStorageLoad(codeName);
        console.log(item);
        storage.push(item);
        storage.sort(function(a, b){
          if(a <= b) {return -1;}
          if(a >= b) {return 1;}
        return 0;
        });
        console.log(storage);
        localStorage.localStorageSave(codeNames, storage);
        localStorage.localStorageDelete(codeName);
        console.log('updated');
        return;
      }

    }

  return {
    codeNameInit: _codeNameInit,
    codeNameSave: _saveCodeNameList,
    codeNameDelete: _removeCodeNameList,
    codeNameCreate: _currentCodeName,
    codeNameUpdate: _updateCodeNameList,
    codeNameListReset: _resetCodeNameList
  };
}])

.service('nextCodeNameLetter', ['localStorage', function(localStorage)
{

  function _nextLetter() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var codeNameList = localStorage.localStorageLoad('CodeNameList');
      if (codeNameList === null) {
        console.log('no saved codes found');
        return alphabet[0];
      } else {
        for (var i = 0; i < codeNameList.length + 1; i++) {
          console.log(i + '   ' + codeNameList.length);
          if (i >= codeNameList.length) {
            return alphabet[i];
          }
          else {
            var l = codeNameList[i].charAt(0).toLowerCase();
            if (l !== alphabet[i]) {
              console.log('codename ' + codeNameList[i]);
              console.log('letter ' + alphabet[i]);
              console.log(alphabet[i]);
              return alphabet[i];
            }
          }
        }
      }
  }
  return {
    letterNext: _nextLetter
  };
}])

.service('nextCodeName',
[
  'nextCodeNameLetter',
  'pokemonService',
  'adjectiveService',
  'localStorage',
  function(nextCodeNameLetter, pokemonService, adjectiveService, localStorage) {
   String.prototype.capitalize = function() {
     return this.charAt(0).toUpperCase() + this.slice(1);
  };
    function _nextCodeName() {
    localStorage.localStorageDelete('CodeName');
    adjectiveService.adjApi().then(function (data){
    var pokedex = pokemonService.pokeApiLoad();
    console.log(pokedex);
    var tempArray = pokedex.pokemon;
    var pokemonList = [];
    var letter = nextCodeNameLetter.letterNext();
    console.log(nextCodeNameLetter.letterNext());
    var regex = new RegExp('api\/v1\/pokemon\/([0-9]+)\/', 'i');
    for (var i = 0; i < tempArray.length; i++) {
      var property = 'resource_uri';
      if (tempArray[i][property].match(regex)[1] <= 151 && tempArray[i].name.charAt(0) === letter) {
        pokemonList.push(tempArray[i].name);
      }}
    console.log(pokemonList);
    if (pokemonList.length <= 0) {
      console.log('error check');
      for (var n = 0; n < tempArray.length; n++) {
        if (tempArray[n].name.charAt(0) === letter) {
          pokemonList.push(tempArray[n].name);
        }}
    }
    var pokemon = pokemonList[Math.floor((Math.random() * pokemonList.length))].capitalize();
    var codeName = data.adjective + ' ' + pokemon;
    var regex2 = /(_)/g;
    var codeName2 = codeName.replace(regex2, '-');
    console.log(codeName2);
    localStorage.localStorageSave('CodeName', codeName2);
    return;
    });
   }

  return {
    codeNameGen: _nextCodeName
  };
}]);
