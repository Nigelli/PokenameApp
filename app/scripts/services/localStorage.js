'use strict';

angular
.module('localStorageService', ['LocalStorageModule'])
.config(function(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('PokeName')
    .setStorageType('localStorage')
    .setStorageCookie(45)
    .setNotify(true, true);
})
// A generic storage service to save and retrive data to local files.
.service('localStorage', function(localStorageService) {

  function _localStorageSave(key, val) {
    console.log('item save');
    return localStorageService.set(key, val);
  }


  function _localStorageLoad(key) {
    console.log('item load');
    return localStorageService.get(key);
  }

  function _localStorageRemove(key) {
    console.log('item remove');
    return localStorageService.remove(key);
  }

  return {
    localStorageSave: _localStorageSave,
    localStorageLoad: _localStorageLoad,
    localStorageDelete: _localStorageRemove
  };
});
