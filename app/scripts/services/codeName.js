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
        return ['Generate your code name now'];
      }
    }
    function _saveCodeNameList(arr) {
      localStorage.localStorageSave(codeNames, arr);
      console.log('saved');
      return;
    }
    function _removeCodeNameList(arr, index) {
      localStorage.localStorageSet(arr.splice([index]));
      console.log(index + ' removed from ' + arr);
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
        return 'Generate a code name now';
      }
    }
    function _updateCodeNameList() {
      var storage = localStorage.localStorageLoad(codeNames);
      var item = localStorage.localStorageLoad(codeName);
      console.log(item);
      storage.push(item);
      console.log(storage);
      localStorage.localStorageSave(codeNames, storage);
      localStorage.localStorageDelete(codeName);
      console.log('updated');
      return;
    }

  return {
    codeNameInit: _codeNameInit,
    codeNameSave: _saveCodeNameList,
    codeNameDelete: _removeCodeNameList,
    codeNameCreate: _currentCodeName,
    codeNameUpdate: _updateCodeNameList
  };
}])

.service('nextCodeNameLetter', ['localStorage', function(localStorage)
{

  function _nextLetter() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var nextLetterNo = function(){
      if (localStorage.localStorageLoad('CodeNameList') === null) {
        return 0;
      } else {
        return localStorage.localStorageLoad('CodeNameList').length;
      }
    };

    console.log(alphabet[nextLetterNo()]);
    return alphabet[nextLetterNo()];
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
    var tempArray = pokedex.pokemon;
    var pokemonList = [];
    var letter = nextCodeNameLetter.letterNext();
    console.log(nextCodeNameLetter.letterNext());
    var i = 0;
    for (; i < tempArray.length; i++) {
      if (tempArray[i].name.charAt(0) === letter) {
        pokemonList.push(tempArray[i].name);
      }}
    var pokemon = pokemonList[Math.floor((Math.random() * pokemonList.length))].capitalize();
    var codeName = data.adjective + ' ' + pokemon;
    localStorage.localStorageSave('CodeName', codeName);
    return;
    });
   }

  return {
    codeNameGen: _nextCodeName
  };
}]);
